import express from 'express';
import db from '../db.js';
const router = express.Router();

// Greet endpoint
router.post('/greet', async (req, res) => {
    let { timeOfDay, language, tone } = req.body;
    timeOfDay = timeOfDay.trim().toLowerCase();
    language = language.trim().toLowerCase();
    tone = tone.trim().toLowerCase();

    const query = `
        SELECT greetingMessage, tone FROM Greetings 
        WHERE LOWER(timeOfDay) = ?
          AND LOWER(language) = ?
          AND LOWER(tone) = ?
    `;

    try {
        const row = await db.get(query, [timeOfDay, language, tone]);
        if (!row) {
            return res.status(404).send({
                error: `Greeting not found. Please check your inputs: timeOfDay=${timeOfDay}, language=${language}, tone=${tone}`
            });
        }
        res.json({ greetingMessage: row.greetingMessage, tone: row.tone });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).send({ error: 'Database error occurred' });
    }
});

// Endpoint to get all times of day
router.get('/getAllTimesOfDay', async (req, res) => {
    const query = `SELECT DISTINCT timeOfDay FROM Greetings`;
    try {
        const rows = await db.all(query);
        if (rows.length === 0) {
            return res.status(404).send({ error: 'No timeOfDay found in the database' });
        }
        res.json(rows.map(row => row.timeOfDay));
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).send({ error: 'Database error occurred' });
    }
});

// Endpoint to get supported languages
router.get('/getSupportedLanguages', async (req, res) => {
    const query = `SELECT DISTINCT language FROM Greetings`;
    try {
        const rows = await db.all(query);
        res.json(rows.map(row => row.language));
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).send({ error: 'Database error occurred' });
    }
});

export default router;
