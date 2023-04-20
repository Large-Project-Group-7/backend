import mongoose from "mongoose";

const BookSchema = new mongoose.Schema
    ({
        ISBN: 
        {
            type: String,
            required: true,
            unique: true
        },
        author:
        {
            type: String,
            required: true,
        },
        title: 
        {
            type: String,
            required: true,
        },
        publisher: 
        {
            type: String,
            required: true,
        },
        yearPublished: 
        {
            type: String, // Datetime prob
            required: true,
        },
        pageCount: 
        {
            type: Number,
            required: true,
        },
        summary: 
        {
            type: String,
            required: true,
        },
        bookCover: 
        {
            type: String,
            required: true,
        },
        reviewCount: 
        {
            type: Number,
            required: true,
        },
        totalScore: 
        {
            type: Number
        },
        reviews: 
        {
            type: Map,
            required: true,
        }
    },
    { timestamps: true}
);

const Book = mongoose.model("Book", BookSchema);
export default Book;
