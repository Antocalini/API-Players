import express from "express";
import { protect, restrictTo } from "../middlewares/auth.js";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", getPlayers);
router.post("/", restrictTo("admin"), createPlayer);
router.get("/:id", getPlayerById);
router.put("/:id", restrictTo("admin"), updatePlayer);
router.delete("/:id", restrictTo("admin"), deletePlayer);

export default router;
