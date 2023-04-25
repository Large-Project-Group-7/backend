import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: 
        {
            type: String,
            required: true,
            unique: true
        },
        admin:
        {
            type: Boolean,
            required: true,
        },
        firstName: 
        {
            type: String,
            required: true,
        },
        lastName: 
        {
            type: String,
            required: true,
        },
        email: 
        {
            type: String,
            required: true,
            unique: true,
        },
        password: 
        {
            type: String,
            required: true,
        },
        reviewCount: 
        {
            type: Number,
            required: true,
        },

        profilePicture: 
        {
            type: String,
            required: false,
        },
        recentBooks: 
        {
            type: Array,
        },
        reviews: 
        {
            type: Array,
        }
    },
    { timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;
