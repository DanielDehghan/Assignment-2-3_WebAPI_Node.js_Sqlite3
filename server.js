import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import greetingRouter from './api/greetings.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/greetings', greetingRouter);

app.get('/health', (req, res) => res.status(200).send('Server is healthy!'));
app.get('/', (req, res) => res.send('Welcome to the API!'));

// Export a function for Vercel's serverless platform
export default (req, res) => {
  app(req, res); // Pass the request to express app
};
