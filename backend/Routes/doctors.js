import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./reviews.js";

const router = express.Router();

// Nested routing for review
router.use("/:doctorId/reviews", reviewRouter);

router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
