import express from 'express';
import { deleteBook, getBookDetails, getBooks, newBook, updateBook } from '../controllers/bookControllers.js';
import { authorizedRoles, isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();
router.route("/books").get(getBooks);
router
    .route("/admin/books")
    .post(isAuthenticatedUser, authorizedRoles("admin"), newBook);

router.route("/books/:id").get(getBookDetails);

router
    .route("/admin/books/:id")
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateBook);

router
    .route("/admin/books/:id")
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteBook);

export default router;
