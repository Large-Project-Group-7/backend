import mongoose from 'mongoose';
const { Schema, model } = mongoose;

//No longer holds a reference to the user since all reviews need to get the user anyways.
const reviewSchema = new Schema({
   bookid: mongoose.Types.ObjectId,
   datecreated: {
      type: Date,
      default: Date.now
   },
   reviewscore: Number,
   summary: String
}, { collection: 'reviews' });

const Review = model('Review', reviewSchema);
export default Review;