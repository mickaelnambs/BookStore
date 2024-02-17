import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter book name"],
        maxLength: [200, "Book name cannot exceed 200 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please enter book price"],
        maxLength: [5, "Book price cannot exceed 5 digits"],
    },
    description: {
        type: String,
        required: [true, "Please enter book description"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter book category"],
        enum: {
            values: [
              "Fantasy",
              "Fiction",
              "Literature",
              "Coming-of-Age",
              "Romance"
            ],
            message: "Please select correct category",
        },
    },
    seller: {
        type: String,
        required: [true, "Please enter book seller"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter book stock"],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    isbn: {
        type: String,
        required: [true, "Please enter book isbn"],
        maxLength: [200, "Book isbn cannot exceed 200 characters"],
    },
    author: {
        type: String,
        required: [true, "Please enter book author"],
        maxLength: [200, "Book author cannot exceed 200 characters"],
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);