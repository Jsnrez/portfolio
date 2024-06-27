import workHistory from './history.js'

// Get Content JSON
const history = workHistory()
// Get html containers
const pillBottle = document.getElementById('pill-bottle')
const resumeContent = document.getElementById('resume-content')

//-------------------------------------------
// Create and Insert Skills Content
//-------------------------------------------
function populatePills(skills) {
    try {
        // Create a document fragment to hold the buttons
        let fragment = ''
    
        skills.forEach(skill => {
            try {
                const button = `<button class="pill" onclick="highlightExperience()">${skill}</button>`
                fragment += button

            } catch (error) {
                console.error(`Failed to create button for skill: ${skill}`, error);
            }
        });
        
        // Clear any existing content in the container
        // pillBottle.innerHTML = '';
        // Insert the fragment to the container
        // pillBottle.innerHTML = fragment
        writeToPage(pillBottle, fragment)

    } catch (error) {
        console.error("Error populating buttons:", error);
    }    
}

// Create Set for Skills - ensures no duplicates
//------------------------------------------------

const skillSet = new Set();

function createSkillsArray(stringArray) {
    stringArray.forEach(skill => {
        if(!skill || typeof skill !== 'string') {
            console.warn('Skill Skipped for Type Error: ', skill)
            return
        }
        skillSet.add(skill)
    });
      
}

// Write Content to Page
//-------------------------------------------

function writeToPage(container, content) {
    // Clear any existing content in the container
    container.innerHTML = '';
    // Insert the fragment to the container
    container.innerHTML = content
}

//-------------------------------------------
// 
//-------------------------------------------

// Function to fetch the data and display it as HTML
async function displayWorkHistory(data) {
    try {

        const keys = Object.keys(data);

        let fragment = ''

        keys.forEach(key => {
            const job = data[key];
            const jobHTML = `
                <div data-skills="${job.skills.join(', ')}">
                    <h4>${job.name}</h4>
                    <p><strong></strong> ${job.title}</p>
                </div>
            `;
            fragment += jobHTML;
        });

        writeToPage(resumeContent, fragment)
        

    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

//-------------------------------------------
// Execute on Content
//-------------------------------------------
try {
    if(!pillBottle) {
        throw new Error("Unable to Find Pill Bottle");
    }
    
    for (const job of Object.values(history)) {
        createSkillsArray(job.skills)
    }
    populatePills(skillSet)
    // displayWorkHistory(history)
    
} catch(error) {
    console.log(error)
}

