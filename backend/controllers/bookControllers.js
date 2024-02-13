import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Book from "../models/book.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get all books => /api/books
export const getBooks = catchAsyncErrors(async (req, res) => {
    const books = await Book.find();

    res.status(200).json({
        books,
    });
});

// Create new book => /api/admin/books
export const newBook = catchAsyncErrors(async (req, res) => {
    const book = await Book.create(req.body);

    res.status(200).json({
        book
    });
});

// Get single book details => /api/books/:id
export const getBookDetails = catchAsyncErrors(async (req, res) => {
    const book = await Book.findById(req?.params?.id);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    res.status(200).json({
        book,
    });
});

// Update book => /api/admin/books/:id
export const updateBook = catchAsyncErrors(async (req, res) => {
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
export const deleteBook = catchAsyncErrors(async (req, res) => {
    let book = await Book.findById(req?.params?.id);

    if (!book) {
        return next(new ErrorHandler('Book not found', 404));
    }

    await book.deleteOne();

    res.status(200).json({
        message: "Book deleted",
    });
});