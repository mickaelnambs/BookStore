import mongoose from "mongoose";
import Book from "../models/book.js";
import books from "./data.js";

const seedBooks = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/book-store");

        await Book.deleteMany();
        console.log('Books are deleted');
        
        await Book.insertMany(books)
        console.log('Books are added');
        
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedBooks();