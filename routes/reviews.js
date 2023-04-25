import express from "express";
import { 
    createReview,
    readReview,
    readAllReviews,
    updateReview,
    deleteReview } from "../controllers/reviews.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// // Create
// router.get("/create", verifyToken, createReview);

// // Read
// router.get("/:userId/reviews", verifyToken, readReview);
// router.get("/", verifyToken, readAllReviews);

// // Update
// router.patch("/:id", verifyToken, updateReview);

// // Delete
// router.delete("/:id", verifyToken, deleteReview);

/* =========TESTING========= */
// Create
router.post("/", createReview);

// Read
router.get("/", readAllReviews);
router.get("/:id", readReview);

// Update
router.patch("/:id", updateReview);

// Delete
router.delete("/:id", deleteReview);

export default router;