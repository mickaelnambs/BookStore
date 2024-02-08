import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnect.js';
const app = express();

dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

app.use(express.json());

// Import all routes.
import bookRoutes from './routes/books.js';

app.use("/api/", bookRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

