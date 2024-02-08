import express from 'express';
import { deleteBook, getBookDetails, getBooks, newBook, updateBook } from '../controllers/bookControllers.js';

const router = express.Router();
router.route("/books").get(getBooks);
router.route("/admin/books").post(newBook);
router.route("/books/:id").get(getBookDetails);
router.route("/admin/books/:id").put(updateBook);
router.route("/admin/books/:id").delete(deleteBook);

export default router;
