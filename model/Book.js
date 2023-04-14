import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    author: String,
    title: String,
    isbn: String,
    publisher: String,
    year_published: Number,
    page_count: Number,
    summary: String,
    review_count: Number,
    total_score: Number,
    book_image: String
}, { collection: 'books' });

const Book = model('Book', bookSchema);
export default Book;