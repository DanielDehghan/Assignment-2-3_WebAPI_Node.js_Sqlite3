import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import greetingRouter from './api/greetings.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/greetings', greetingRouter);

app.get('/health', (req, res) => res.status(200).send('Server is healthy!'));

app.get('/', (req, res) => res.send('Welcome to the API!'));

export default (req, res) => {
  app(req, res); // vercel's serverless handler
};



