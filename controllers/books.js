import Book from "../models/Book.js";

// createBook
// getBook
// updateBook
// updateScore
// deleteBook (admin only)

// Read
// Modify this so that it takes in an array and returns all matching users of array
export const getBook = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getRecentBooks = async (req, res) =>
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
export const updateBook = async (req, res) =>
{
    try
    {
        const { id, ISBN } = req.params;
        const user = await User.findById(id);
        // Change this if we think having duplicates in history is fine.
        // This is currently written so that no duplicates can be entered
        if(!user.recentBooks.includes(ISBN))
        {
            user.recentBooks.push(ISBN);
        }
        await user.save();
        // Ask frontend if they'd like the response to contain the array of ISBNs
        res.status(200).json({ message: "Added book to recents"})

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

//TODO
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
        const user = await User.findById(id);
        // Delete all reviews from collection found in map and update scores accordingly
        // Delete all book map entries that match userid
        // Delete user
        User.deleteOne(id);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};