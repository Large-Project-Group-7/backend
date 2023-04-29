import Review from "../models/Review.js";

// Create
export const createReview = async (req, res) =>
{
    try
    {
        const { userID, bookID, score, review } = req.body;
        const newReview = new Review
        ({
            userID: userID,
            bookID: bookID,
            score: score,
            review: review,
        });
        await newReview.save();
        const rev = await Review.find();
        res.status(201).json(rev);
        
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// Read
// Make this function filter by ID
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
        const review = await Review.findOneAndUpdate(id, updates);
        res.status(200).json(review._id);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Delete
// This sends 200 even if nothing was deleted. Check if _id exists and if not return 404 status code
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