import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
} from "../Controllers/userControllers.js";
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.put("/:id",authenticate,restrict(["patient"]), updateUser);
router.delete("/:id",authenticate,restrict(["patient"]), deleteUser);
router.get("/:id",authenticate,restrict(["patient"]), getSingleUser);
router.get("/",authenticate,restrict(["admin"]), getAllUser);

export default router;
