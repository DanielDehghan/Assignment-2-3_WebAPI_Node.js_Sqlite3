import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DB_PATH ? path.resolve(process.env.DB_PATH) : path.join(process.cwd(), 'greetings.db');
console.log("DB Path:", dbPath);
// Open and return the database connection
const openDb = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('Database connected.');

  const createTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS Greetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timeOfDay TEXT NOT NULL,
        language TEXT NOT NULL,
        greetingMessage TEXT NOT NULL,
        tone TEXT NOT NULL
      );`;
    await db.run(query);
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
    console.log("Seeding data...");
    await db.run(query);
    console.log('Database populated with greetings.');
  };
  

  await createTable();
  await seedData();

  return db;  // Return the database instance
};

// Call the function to open the database and then export the connection
const dbInstance = openDb().catch((err) => {
  console.error('Error running migrations:', err);
  process.exit(1);
});

export default dbInstance;
