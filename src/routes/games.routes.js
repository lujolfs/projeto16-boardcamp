import { Router } from "express";
import { create, findAll } from "../controllers/games.controller.js";

const gamesRouter = Router();

gamesRouter.post("/games", create);
gamesRouter.get("/games", findAll);

export default gamesRouter;