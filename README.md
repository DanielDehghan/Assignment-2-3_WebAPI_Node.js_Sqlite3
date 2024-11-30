# API Deployment

## Live API URL
The live API can be accessed at:
[https://your-vercel-deployment-url](https://your-vercel-deployment-url)

## Example Endpoint
**POST** `/api/greeting/greet`

- **Request Body**: JSON with `timeOfDay`, `language`, and `tone`
- **Response**: JSON with `greetingMessage` and `tone`

## Console Application
To interact with the live API using the console application:
1. Clone the repository.
2. Run the `GreetingClient.js` script.
3. Follow the prompts to request greetings.

## Setup Instructions
- Add `DATABASE_URL` to your environment variables on Vercel.