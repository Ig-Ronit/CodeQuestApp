import express from "express";
import { login, signup } from "../controller/auth.js";
import { getallusers, updateprofile } from "../controller/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Log headers for debugging in every request
router.use((req, res, next) => {
  console.log("Request received:", req.headers);
  next();
});

router.post("/signup", signup);
router.post("/login", login);

// Log specific details in each route if needed
router.get(
  "/getallusers",
  (req, res, next) => {
    console.log("Fetching all users...");
    next();
  },
  getallusers
);

router.patch(
  "/update/:id",
  auth,
  (req, res, next) => {
    console.log("Updating profile for user ID:", req.params.id);
    next();
  },
  updateprofile
);

export default router;
