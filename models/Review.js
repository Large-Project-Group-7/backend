import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        userID: 
        {
            type: String,
            required: true,
            unique: true
        },
        bookID:
        {
            type: String,
            required: true,
        },
        score:
        {
            type: Number,
            required: true,
        },
        review:
        {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
