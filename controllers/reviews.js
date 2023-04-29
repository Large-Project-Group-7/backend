import Review from "../models/Review.js";

// Create
//Make sure to add the review to the User Array and the Book Array. 
export const createReview = async (req, res) =>
{
    try
    {
        const { userID, bookID, score, review } = req.body;
        
        const book = await Book.findById(bookID);
    
        if(book == null)
        {
            console.log("Book doesn't exist");
            res.status(404).json({message:"A book with the id " + bookID + " doesn't exist"});
            return;
        }

        const user = await User.findById(userID);

        if(user == null)
        {
            console.log("Id doesn't exist");
            res.status(404).json({message:"A user with the id " + userID + " doesn't exist"});
            return;
        }
        //console.log("Book: " + JSON.stringify(book));
        //console.log("User: " + JSON.stringify(user));

        const newReview = new Review
        ({
            userID: userID,
            bookID: bookID,
            score: score,
            review: review,
        });

        //Response is the new review that's created. I need to keep it. 
        const response = await newReview.save();

        //If the array doesn't exist, create it. 
        book.reviews = (book.reviews == null) ? [] : book.reviews;
        user.reviews = (user.reviews == null) ? [] : user.reviews;

        //Add the review id to the reviews field. 
        book.reviews.push(response["_id"]);
        user.reviews.push(response["_id"]);
        user.reviewCount += 1;
        book.reviewCount += 1;
        book.totalScore += score;
        //Save the user and the book. 
        await book.save();
        await user.save();

        res.status(201).json(await Review.find());
        
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// Read
// Make this function filter by ID

//TODO: Make it work for finding a user's reviews. 
export const readReview = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const review = await Review.findById(id);
        res.status(200).json(review);
    } catch (err) {
        res.response(404).json({ message: err.message });
    }
}

// Make this function filter by userID and return array of results
export const readAllReviews = async (req, res) =>
{
    try
    {
        const review = await Review.find();
        res.status(200).json(review);
    } catch (err) {
        res.response(404).json({ message: err.message });
    }
}

// Update
export const updateReview = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const updates = req.body;
        const filter = { _id: id };
        const review = await Review.findOneAndUpdate(filter, updates, { new: true});
        res.status(200).json(review._id);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Delete
// This sends 200 even if nothing was deleted. Check if _id exists and if not return 404 status code
//TODO: Make sure to remove the review id from both the User and the book. 
export const deleteReview = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const review = await Review.findByIdAndRemove({_id: req.params.id});
        res.status(200).json(review);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}