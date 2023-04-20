import express from "express";
import { 
    createReview, 
    getReviews, 
    getUserReviews, 
    updateReview, 
    deleteReview } from "../controllers/reviews.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create
router.get("/create", verifyToken, createReview);

// Read
router.get("/", verifyToken, getReviews);
router.get("/:userId/reviews", verifyToken, getUserReviews);

// Update
router.patch("/:id", verifyToken, updateReview);

// Delete
router.delete("/:id", verifyToken, deleteReview);

export default router;