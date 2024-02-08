import Book from "../models/book.js";

// Get all books => /api/books
export const getBooks = async (req, res) => {
    const books = await Book.find();

    res.status(200).json({
        books,
    })
}