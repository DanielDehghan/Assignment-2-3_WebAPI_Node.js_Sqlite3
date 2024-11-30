import express from 'express';
import db from '../db.js';  // Adjust if your path differs
const router = express.Router();

// Greet endpoint 
router.post('/greet', (req, res) => {
    let { timeOfDay, language, tone } = req.body;
    timeOfDay = timeOfDay.trim().toLowerCase();
    language = language.trim().toLowerCase();
    tone = tone.trim().toLowerCase();

    const query = `
        SELECT greetingMessage, tone FROM Greetings 
        WHERE LOWER(timeOfDay) = $1
          AND LOWER(language) = $2
          AND LOWER(tone) = $3
    `;

    db.query(query, [timeOfDay, language, tone])
        .then(result => {
            console.log(result.rows);
            const row = result.rows[0];
            if (!row) {
                return res.status(404).send({
                    error: `Greeting not found. Please check your inputs: timeOfDay=${timeOfDay}, language=${language}, tone=${tone}`
                });
            }
            res.json({
                greetingMessage: row.greetingmessage,
                tone: row.tone
            });
        })
        .catch(err => {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database error occurred' });
        });

});

// Endpoint to get all times of day
router.get('/getAllTimesOfDay', (req, res) => {
    const query = `SELECT DISTINCT timeOfDay FROM Greetings`;
    db.query(query)
        .then(result => {
            console.log('Query executed. Rows returned:', result.rows);
            const rows = result.rows;
            if (rows.length === 0) {
                return res.status(404).send({ error: 'No timeOfDay found in the database' });
            }
            res.json(rows.map(row => row.timeofday));
        })
        .catch(err => {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database error occurred' });
        });
});


// Endpoint to get supported languages
router.get('/getSupportedLanguages', (req, res) => {
    const query = `SELECT DISTINCT language FROM Greetings`;
    db.query(query)
        .then(result => {
            const rows = result.rows;
            res.json(rows.map(row => row.language));
        })
        .catch(err => {
            return res.status(500).send({ error: 'Database error' });
        });
});

export default router;
