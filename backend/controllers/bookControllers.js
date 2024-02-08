import Book from "../models/book.js";

// Get all books => /api/books
export const getBooks = async (req, res) => {
    const books = await Book.find();

    res.status(200).json({
        books,
    })
}

// Create new book => /api/admin/books
export const newBook = async (req, res) => {
    const book = await Book.create(req.body);

    res.status(200).json({
        book
    });
}

// Get single book details => /api/books/:id
export const getBookDetails = async (req, res) => {
    const book = await Book.findById(req?.params?.id);

    if (!book) {
        return res.status(404).json({
            error: "Book not found"
        });
    }

    res.status(200).json({
        book,
    });
}

// Update book => /api/admin/books/:id
export const updateBook = async (req, res) => {
    let book = await Book.findById(req?.params?.id);

    if (!book) {
        return res.status(404).json({
            error: "Book not found"
        });
    }
    
    book = await Book.findByIdAndUpdate(req?.params?.id, req.body, { new: true });

    res.status(200).json({
        book,
    });
}

// Delete product => /api/admin/books/:id
export const deleteBook = async (req, res) => {
    let book = await Book.findById(req?.params?.id);

    if (!book) {
        return res.status(404).json({
            error: "Book not found"
        });
    }

    await book.deleteOne();

    res.status(200).json({
        message: "Book deleted",
    })
}