const express = require('express');
const db = require('../db');
const router = express.Router();

// Greet endpoint 
router.post('/greet', (req, res) => {
    const { timeOfDay, language, tone } = req.body;
    const query = `SELECT greetingMessage FROM Greetings WHERE timeOfDay = ? AND language = ? AND tone = ?`;
    db.get(query, [timeOfDay, language, tone], (err, row) => {
        if (err)
            return res.status(500).send({ error: 'Database error' });
        if (!row)
            return res.status(404).send({ error: 'Greeting not found' });

        res.json({ greetingMessage: row.greetingMessage });
    });
});

// Geting all times of day 
router.get('/getAllTimesOfDay', (req, res) => {
    const query = `SELECT DISTINCT timeOfDay FROM Greetings`;
    db.all(query, [], (err, rows) => {
        if (err)
            return res.status(500).send({ error: 'Database error' });
        res.json(rows.map(row => row.timeOfDay));
    });
});

// getting supported languages
router.get('/getSupportedLanguages', (req, res) => {
    const query = `SELECT DISTINCT language FROM Greetings`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).send({ error: 'Database error' });
        res.json(rows.map(row => row.language));
    });
});

module.exports = router;