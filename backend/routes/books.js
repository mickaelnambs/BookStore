import express from 'express';
import { getBooks } from '../controllers/bookControllers.js';

const router = express.Router();
router.route("/books").get(getBooks);

export default router;
