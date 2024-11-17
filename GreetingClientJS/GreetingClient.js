import fetch from 'node-fetch';
import readline from 'readline';

const url = "http://localhost:5105/api/greeting/greet";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask a question and return a promise
const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};
//Greeting Request data
// const greetingRequest = {
//     timeOfDay: 'Morning',
//     language: 'English',
//     tone: 'Casual'
// }

//Call the API 

async function getGreeting() {
    while (true) {
        try {
            // Prompt user for input
            const timeOfDay = await askQuestion("Enter a time of day (e.g., Morning, Evening or Afternoon) or type 'exit' to quit: ");
            if (timeOfDay.toLowerCase() === 'exit') break; // Exit the loop if the user types 'exit'

            const language = await askQuestion("Enter a language (e.g., English, Spanish or French) or type 'exit' to quit: ");
            if (language.toLowerCase() === 'exit') break;

            const tone = await askQuestion("Enter Tone (Formal/Casual) or type 'exit' to quit: ");
            if (tone.toLowerCase() === 'exit') break;

            // Greeting Request data
            const greetingRequest = {
                timeOfDay: timeOfDay,
                language: language,
                tone: tone
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(greetingRequest)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const greetingResponse = await response.json();
            console.log('Greeting:', greetingResponse.message);
            console.log('Tone:', greetingResponse.tone);
        } catch (err) {
            console.log('Error fetching the greeting:', err);
        }
    }
    rl.close(); // Close the readline interface after the loop ends
}


getGreeting();