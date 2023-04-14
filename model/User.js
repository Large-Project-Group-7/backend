import mongoose from 'mongoose';
import Review from './Review.js';
const { Schema, model } = mongoose;

//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/#
//https://stackoverflow.com/questions/38970835/mongodb-add-element-to-array-if-not-exists, how to add reviews
//https://stackoverflow.com/questions/33576223/using-mongoose-mongodb-addtoset-functionality-on-array-of-objects
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  password: String,
  datejoined: {
    type: Date,
    default: Date.now
  },
  img: String,
  reviews: Object
}, { collection: 'users'});

const User = model('User', userSchema);
export default User;