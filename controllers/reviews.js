import Review from "../models/Review.js";

// createReview, 
// getReviews, 
// getUserReviews, 
// updateReview, 
// deleteReview

// Create
export const createReview = async (req, res) =>
{
    try
    {
        const { userID, bookID, score, review } = req.body;
        const newReview = new postMessage
        ({
            userID: userID,
            bookID: bookID,
            score: score,
            review: review,
        });
        await newReview.save();

        // Might need to change this based on frontend needsd
        const rev = await Review.find();
        res.status(201).json(rev);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// Read
// Make this function take in an array and return reviews that match array contents
export const getReviews = async (req, res) =>
{
    try
    {
        const review = await Review.find();
        res.status(200).json(post);
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
        const { userID } = req.body;
        const review = await Post.findById(id);
        res.status(200).json();
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}