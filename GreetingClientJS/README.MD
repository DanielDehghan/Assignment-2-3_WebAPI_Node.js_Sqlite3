# Greeting Client

This is a simple client application to interact with the Greeting API. It allows users to fetch greetings based on time of day, language, and tone.


## Prerequisites

Before running the client, ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. **Install dependencies:**:

Run the following command to install the necessary dependencies:

npm install node-fetch

 ## Usage

 1. **Run the Greeting API:**:

 Ensure that the Greeting API is running on your local machine. The API should be accessible at http://localhost:5105/api/greeting.


2. **Run the Client:**:

Run the Client: In the terminal, navigate to the directory containing GreetingClient.js and execute: 

node GreetingClient.js

3. **Input data:**:

Follow the prompts to enter the time of day, language, and tone. The client will make a request to the API and display the greeting received.

## Example Request

For example, when prompted, you can enter:

    Time of Day: Morning
    Language: English
    Tone: Casual

## Troubleshooting

Error fetching the greeting: Ensure the API is running and accessible at the specified URL.
Module not found: Make sure to install the necessary dependencies as outlined in the installation section.