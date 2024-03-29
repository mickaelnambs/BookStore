import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';
const app = express();

// Handle Uncaught exceptions.
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
})

dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

app.use(express.json());
app.use(cookieParser());

// Import all routes.
import bookRoutes from './routes/books.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';

app.use("/api/", bookRoutes);
app.use("/api/", authRoutes);
app.use("/api/", orderRoutes);

// Using error middleware.
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejection.
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err}`);
    console.log("Shutting down server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});

