import pool from './db.js';

const createTable = async () => {
    const query = `
CREATE TABLE IF NOT EXISTS Greetings (
    id SERIAL PRIMARY KEY,
    timeOfDay TEXT NOT NULL,
    language TEXT NOT NULL,
    greetingMessage TEXT NOT NULL,
    tone TEXT NOT NULL
    );`;
    await pool.query(query);
    console.log('Greetings table created or already exists.');
};

const seedData = async () => {
    const query = `
INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES
('Morning', 'English', 'Good Morning', 'Formal'),
('Morning', 'English', 'Morning, buddy!', 'Casual'),
('Afternoon', 'English', 'Good Afternoon', 'Formal'),
('Afternoon', 'English', 'Hey there!', 'Casual'),
('Evening', 'English', 'Good Evening', 'Formal'),
('Evening', 'English', 'What''s up?', 'Casual'),
('Morning', 'French', 'Bonjour', 'Formal'),
('Morning', 'French', 'Salut!', 'Casual'),
('Afternoon', 'French', 'Bon Après-midi', 'Formal'),
('Afternoon', 'French', 'Coucou!', 'Casual'),
('Evening', 'French', 'Bonsoir', 'Formal'),
('Evening', 'French', 'Salut!', 'Casual'),
('Morning', 'Spanish', 'Buenos Días', 'Formal'),
('Morning', 'Spanish', '¡Hola!', 'Casual'),
('Afternoon', 'Spanish', 'Buenas Tardes', 'Formal'),
('Afternoon', 'Spanish', '¿Qué tal?', 'Casual'),
('Evening', 'Spanish', 'Buenas Noches', 'Formal'),
('Evening', 'Spanish', '¡Qué tal!', 'Casual');
    `;
    await pool.query(query);
    console.log('Database populated with greetings.');
};

// Run the migration and seeding 
const runMigration = async () => {
    await createTable();
    await seedData();
    process.exit(0); // Closing the process after migration is complete
};

runMigration().catch((err) => {
    console.error('Error running migrations:', err);
    process.exit(1);
});
