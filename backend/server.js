import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.use(express.json()); //allow to accept json data in the req.body

//Routes
app.use("/api/products", productRoutes);


app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000, http://localhost:3000/');
});