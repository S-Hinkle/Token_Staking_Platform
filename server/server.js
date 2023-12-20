// Import the necessary modules
import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, '../.env') });


// Create a new pool instance to manage multiple database connections.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

// Create an Express application
const app = express();


// Use middleware to parse JSON bodies, CORS, and run index.html
app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));






// ==================== MetaMask Authentication ====================  //

app.post('/login', async (req, res) => {
    const userAddress = req.body.account;

    try {
        // Check if the user exists
        const userQuery = 'SELECT * FROM wallets WHERE wallet_address = $1';
        const userResult = await pool.query(userQuery, [userAddress]);
        //console.log('userResult: ' + JSON.stringify(userResult.rows[0].id)) // TROUBLESHOOTING REMOVE LATER

        if (userResult.rows.length === 0) {
            // User does not exist, create a new one
            const insertQuery = 'INSERT INTO wallets (wallet_address) VALUES ($1) RETURNING id';
            const insertResult = await pool.query(insertQuery, [userAddress]);
            console.log('insertResult: ' + insertResult) // TROUBLESHOOTING REMOVE LATER
            // Return the new user data
            return res.json({ success: true, userId: insertResult.rows[0].id, newUser: true });
        } else {
            // User exists, return existing data
            return res.json({ success: true, userId: userResult.rows[0].id, newUser: false });
        }
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




// READ: Get all users FOR TESTING PURPOSES
app.get('/wallets', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM wallets');
        res.status(200).json(allUsers.rows);
        console.log(allUsers.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
});






// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
  
// Start the server and have it listen on the specified port
app.listen(process.env.PORT, () => {
console.log(`Server running on port ${process.env.PORT}`);
});