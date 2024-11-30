import express from 'express';
import pool from './db.js';

const router = express.Router();

router.post('/greet', async (req, res) => {
    try {
        const { timeOfDay, language, tone } = req.body;

        // Query the database for a greeting message based on the user's input
        const result = await pool.query(
            'SELECT * FROM Greetings WHERE timeOfDay = $1 AND language = $2 AND tone = $3 LIMIT 1',
            [timeOfDay, language, tone]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No greeting found for the given parameters' });
        }

        const greeting = result.rows[0];
        res.json({
            greetingMessage: greeting.greetingMessage,
            tone: greeting.tone,
        });
    } catch (err) {
        console.error('Error handling the greeting request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
