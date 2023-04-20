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
        dateJoined: 
        {
            type: String,
            required: true,
        },
        profilePicture: 
        {
            type: String,
            required: true, //Might not be required idk
        },
        recentBooks: 
        {
            type: Array,
            default: [],
            unique: true,
        },
        reviews: 
        {
            type: Map,
            of: String,
            required: true,
        }
    },
    { timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;
