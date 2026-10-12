import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createJob);
router.get("/", getJobs);

router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;