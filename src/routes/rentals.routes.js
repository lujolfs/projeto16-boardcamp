import {Router} from "express";
import {create, findAll} from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", create);
rentalsRouter.get("/rentals", findAll);

export default rentalsRouter;