import { Router } from "express";
import { create } from "../controllers/games.controller.js";

const gamesRouter = Router();

gamesRouter.post("/games", create);

export default gamesRouter;