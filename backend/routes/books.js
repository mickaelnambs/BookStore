import express from 'express';
import { createBookReview, deleteBook, deleteReview, getBookDetails, getBookReviews, getBooks, newBook, updateBook } from '../controllers/bookControllers.js';
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

router
    .route("/reviews")
    .get(isAuthenticatedUser, getBookReviews)
    .put(isAuthenticatedUser, createBookReview);

 router
    .route("/admin/reviews")
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteReview)

export default router;
