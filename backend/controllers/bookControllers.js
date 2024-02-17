import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Book from "../models/book.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get all books => /api/books
export const getBooks = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4;
    const apiFilters = new APIFilters(Book, req.query).search().filters();

    let books = await apiFilters.query;
    let filteredBooksCount = books.length;

    apiFilters.pagination(resPerPage);
    books = await apiFilters.query.clone();

    res.status(200).json({
        resPerPage,
        filteredBooksCount,
        books,
    });
});

// Create new book => /api/admin/books
export const newBook = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user._id;
    const book = await Book.create(req.body);

    res.status(200).json({
        book
    });
});

// Get single book details => /api/books/:id
export const getBookDetails = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req?.params?.id);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    res.status(200).json({
        book,
    });
});

// Update book => /api/admin/books/:id
export const updateBook = catchAsyncErrors(async (req, res, next) => {
    let book = await Book.findById(req?.params?.id);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }
    
    book = await Book.findByIdAndUpdate(req?.params?.id, req.body, { new: true });

    res.status(200).json({
        book,
    });
});

// Delete product => /api/admin/books/:id
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
    let book = await Book.findById(req?.params?.id);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    await book.deleteOne();

    res.status(200).json({
        message: "Book deleted",
    });
});

// Create/Update book review => /api/reviews
export const createBookReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, bookId } = req.body;

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    }

    const book = await Book.findById(bookId);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    const isReviewed = book?.reviews.find((r) => r.user.toString() === req?.user?._id.toString());

    if (isReviewed) {
        book.reviews.forEach((review) => {
            if (review?.user?.toString() === req?.user?._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        book.reviews.push(review);
        book.numOfReviews = book.reviews.length;
    }

    book.ratings = book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length;

    await book.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

// Get book reviews => /api/reviews
export const getBookReviews = catchAsyncErrors(async (req, res, next) => {
    const book = await Book.findById(req.query.id);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    res.status(200).json({
        reviews: book.reviews,
    });
});

// Delete book review - ADMIN => /api/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    let book = await Book.findById(req.query.bookId);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    const reviews = book?.reviews?.filter(
        (review) => review._id.toString() !== req?.query?.id.toString()
    );

    const numOfReviews = reviews.length;

    const ratings = numOfReviews === 0 ? 0 : book.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

    book = await Book.findByIdAndUpdate(
        req.query.bookId,
        { reviews, numOfReviews, ratings },
        { new: true }
    );

    res.status(200).json({
        success: true,
        book,
    });
});