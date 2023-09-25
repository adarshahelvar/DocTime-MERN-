import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.put("/:id",authenticate,restrict(["doctor"]), updateDoctor);
router.delete("/:id",authenticate,restrict(["doctor"]), deleteDoctor);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);

export default router;
