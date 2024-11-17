import express from 'express';
import db from '../db.js';
const router = express.Router();

// Greet endpoint 
router.post('/greet', (req, res) => {
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

    db.get(query, [timeOfDay, language, tone], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database error occurred' });
        }
        if (!row) {
            return res.status(404).send({
                error: `Greeting not found. Please check your inputs: timeOfDay=${timeOfDay}, language=${language}, tone=${tone}`
            });
        }
        res.json({ greetingMessage: row.greetingMessage, tone: row.tone });
    });
});

// Endpoint to get all times of day
router.get('/getAllTimesOfDay', (req, res) => {
    const query = `SELECT DISTINCT timeOfDay FROM Greetings`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }
        res.json(rows.map(row => row.timeOfDay));
    });
});

// Endpoint to get supported languages
router.get('/getSupportedLanguages', (req, res) => {
    const query = `SELECT DISTINCT language FROM Greetings`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send({ error: 'Database error' });
        res.json(rows.map(row => row.language));
    });
});

export default router;
