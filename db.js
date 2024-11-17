import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./greetings.db');

// Creating Greetings Table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Greetings(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timeOfDay TEXT NOT NULL,
        language TEXT NOT NULL,
        greetingMessage TEXT NOT NULL,
        tone TEXT NOT NULL
    )`);

    // Seed data   
    db.run(`
        INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES
            -- English Greetings
            ('Morning', 'English', 'Good Morning', 'Formal'),
            ('Morning', 'English', 'Morning, buddy!', 'Casual'),
            ('Afternoon', 'English', 'Good Afternoon', 'Formal'),
            ('Afternoon', 'English', 'Hey there!', 'Casual'),
            ('Evening', 'English', 'Good Evening', 'Formal'),
            ('Evening', 'English', 'What''s up?', 'Casual'),

            -- French Greetings
            ('Morning', 'French', 'Bonjour', 'Formal'),
            ('Morning', 'French', 'Salut!', 'Casual'),
            ('Afternoon', 'French', 'Bon Après-midi', 'Formal'),
            ('Afternoon', 'French', 'Coucou!', 'Casual'),
            ('Evening', 'French', 'Bonsoir', 'Formal'),
            ('Evening', 'French', 'Salut!', 'Casual'),

            -- Spanish Greetings
            ('Morning', 'Spanish', 'Buenos Días', 'Formal'),
            ('Morning', 'Spanish', '¡Hola!', 'Casual'),
            ('Afternoon', 'Spanish', 'Buenas Tardes', 'Formal'),
            ('Afternoon', 'Spanish', '¿Qué tal?', 'Casual'),
            ('Evening', 'Spanish', 'Buenas Noches', 'Formal'),
            ('Evening', 'Spanish', '¡Qué tal!', 'Casual');
    `, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Database populated with all possible greetings.');
        }
    });
});

export default db;
