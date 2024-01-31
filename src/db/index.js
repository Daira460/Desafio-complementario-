import mongoose from 'mongoose';
import { dbUser, dbPassword, dbHost, dbName } from '../config/index.config.js';

const mongoConnect = async () => {
    try {
       await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`);
       console.log('DB is connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
};

export default mongoConnect;

