import User from "../models/User.js";
import Book from "../models/Book.js";
import mongoose from "mongoose"
// Read
// Modify this so that it takes in an array and returns all matching users of array
export const readUser = async (req, res) =>
{
    try
    {
        //00 First Bit - Ascending/Descending Username
        //00 Second Bit - High/Low Count
        const id = req.params.id;
        //Janky, but works
        var isObjectId = mongoose.Types.ObjectId.isValid(id);
        //const { id } = req.params;
        //console.log("Query: " + JSON.stringify(req.query));

        //Take in pagination information from the query, if present
        var page = req.query.page == null ? 0 : req.query.page-1;
        page = (page < 0) ? 0 : page;
        var perpage = req.query.perpage == null ? 10 : req.query.perpage;
        perpage = (perpage< 0) ? 0 : perpage;
        const skip = page * perpage;

        const user = (isObjectId) ? await User.findById(id) : await User.find({username:{ $regex: "^"+id, '$options' : 'i'}}).skip(skip).limit(perpage);
        //user.check = "AppleBees";
        //req.params.god = "Damnit";
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const readAllUsers = async (req, res) =>
{
    try
    {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.response(404).json({ message: err.message });
    }
}

export const readUserRecentBooks = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const user = await User.findById(id);
    
        // This might be wrong. Goal of this is for every ISBN in recentBooks, look in Books collection for respective data.
        const recent = await Promise.all(user.recentBooks.map((ISBN) => Book.findById(ISBN)));
        // We can modify the data sent back in this call based on needs of front end
        const formattedRecents = recent.map(({ ISBN, author, publisher, yearPublished, pageCount, summary, bookCover, reviewCount, totalScore, reviews}) =>
        {
            return { ISBN, author, publisher, yearPublished, pageCount, summary, bookCover, reviewCount, totalScore, reviews};
        });
        res.status(200).json(formattedRecents);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update
//TODO
export const updateUser = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const updates = req.body;
        const user = await User.findOneAndUpdate(id, updates);

        // Uncomment after consulting front end
        // if(!user.recentBooks.includes(ISBN))
        // {
        //     user.recentBooks.push(ISBN);
        // }
        // await user.save();
        // Ask frontend if they'd like the response to contain the array of ISBNs
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Delete
export const deleteUser = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const user = await User.findByIdAndRemove({_id : req.params.id});

        res.status(200).json({message: "Successfully deleted user"});
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};
