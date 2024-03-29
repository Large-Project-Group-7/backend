import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ======= PROD ======= */
// // Register User
// export const register = async (req, res) =>
// {
//     try
//     {
//         const
//         {
//             username,
//             admin,
//             firstName,
//             lastName,
//             email,
//             password,
//             reviewCount,
//             dateJoined,
//             profilePicture,
//             recentBooks,
//             reviews
//         } = req.body;

//         const salt = await bcrypt.genSalt();
//         const passwordHash = await bcrypt.hash(password, salt);

//         const newUser = new User
//         ({
//             username,
//             admin,
//             firstName,
//             lastName,
//             email,
//             password: passwordHash,
//             reviewCount,
//             dateJoined,
//             profilePicture,
//             recentBooks,
//             reviews
//         });
//         const savedUser = await newUser.save();
//         res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// };

// // Login
// export const login = async (req, res) =>
// {
//     try
//     {
//         const  {email, password } = req.body;
//         const user = await User.findOne({ email: email});
//         if (!user) return res.status(400).json({ msg: "User does not exist." });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         delete user.password;
//         res.status(200).json({ token, user});
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
// };

/* ======= TESTING ======= */
// Register User
export const register = async (req, res) =>
{
    try
    {
        const
        {
            username,
            admin,
            firstName,
            lastName,
            email,
            password,
            reviewCount,
            recentBooks,
            reviews
        } = req.body;

        const newUser = new User
        ({
            username,
            admin,
            firstName,
            lastName,
            email,
            password,
            reviewCount,
            recentBooks,
            reviews
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// Login
export const login = async (req, res) =>
{
    try
    {
        const  {email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({error: "Login failed."});
    }
};