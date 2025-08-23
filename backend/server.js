import express from 'express';
import dotenv from 'dotenv';
import { connnectDB } from './config/db.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(3000, () => {
  connnectDB();
  console.log('Server is running on port 3000, http://localhost:3000/');
});