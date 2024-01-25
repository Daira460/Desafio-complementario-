// src/config/index.config.js
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

// Asegúrate de que db esté definido
const db = {
    dbUser,
    dbPassword,
    dbHost,
    dbName,
};

export { PORT, dbUser, dbPassword, dbHost, dbName, db };
