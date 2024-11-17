const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./greetings.db')

//Creating Greetings Table 
db.serialize(()=>{

 db.run(`CREATE TABLE IF NOT EXISTS Greetings(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timeOfDay TEXT NOT NULL,
    language TEXT NOT NULL,
    greetingMessage TEXT NOT NULL,
    tone TEXT NOT NULL
    )`);

    // Seed data   
db.run(`INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES
    ('Morning', 'English', 'Good Morning', 'Formal'),
    ('Morning', 'English', 'Morning, buddy!', 'Casual'),
    ('Afternoon', 'French', 'Bon Après-midi', 'Formal'),
    ('Evening', 'Spanish', 'Buenas Noches', 'Formal'),
    ('Evening', 'Spanish', '¡Qué tal!', 'Casual')`);
});

module.exports = db;