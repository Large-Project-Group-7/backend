import Book from "../models/Book.js";
import mongoose from "mongoose"
// createBook
// getBook
// updateBook
// updateScore
// deleteBook (admin only)

// Create
export const createBook = async (req, res) =>
{
    // Need to update so it works with images
    try
    {
        const
        {
            ISBN,
            author,
            title,
            publisher,
            yearPublished,
            pageCount,
            summary,
            reviewCount,
            totalScore,
            reviews
        } = req.body;

        const newBook = new Book
        ({
            ISBN,
            author,
            title,
            publisher,
            yearPublished,
            pageCount,
            summary,
            reviewCount,
            totalScore,
            reviews
        });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Read
export const readBook = async (req, res) =>
{
    try
    {
        const id = req.params.id;
        var isObjectId = mongoose.Types.ObjectId.isValid(id);

        var page = req.query.page == null ? 0 : req.query.page-1;
        page = (page < 0) ? 0 : page;
        var perpage = req.query.perpage == null ? 10 : req.query.perpage;
        perpage = (perpage< 0) ? 0 : perpage;
        const skip = page * perpage;

        const book = (isObjectId) ? await Book.findById(id) : await Book.find({title:{ $regex: "^"+id, '$options' : 'i'}}).skip(skip).limit(perpage);
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const readAllBooks = async (req, res) =>
{
    try
    {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (err) {
        res.response(404).json({ message: err.message });
    }
};

// Update
//TODO
export const updateBook = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const updates = req.body;
        const book = await Book.findOneAndUpdate(id, updates);

        // Uncomment after consulting front end
        // if(!user.recentBooks.includes(ISBN))
        // {
        //     user.recentBooks.push(ISBN);
        // }
        // await user.save();
        // Ask frontend if they'd like the response to contain the array of ISBNs
        res.status(200).json(book);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//TODO: finish this
export const updateScore = async (req, res) =>
{
    try
    {
        // Modify this to hold reviewID once naming convention is determined
        const { id, ISBN } = req.params;
        const user = await User.findById(id);
        if(user.recentBooks.includes(ISBN))
        {
            // This should return and send an error as a user cannot have multiple reviews for one book.
            // user.recentBooks.push(ISBN);
        }
        await user.save();
        // Ask frontend if they'd like the response to contain the map.
        res.status(200).json({ message: "Added entry to map."})

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Delete
export const deleteBook = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const book = await Book.findByIdAndRemove({_id : req.params.id});

        res.status(200).json({message: "Successfully deleted book"});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};