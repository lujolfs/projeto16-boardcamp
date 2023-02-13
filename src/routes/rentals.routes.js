import {Router} from "express";
import {create, findAll, finish, deleteRent} from "../controllers/rentals.controller.js";
import { schemaValidateRentedGame } from "../middlewares/schemaValidateRentals.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", schemaValidateRentedGame, create);
rentalsRouter.get("/rentals", findAll);
rentalsRouter.post("/rentals/:id/return", finish);
rentalsRouter.delete("/rentals/:id", deleteRent);

export default rentalsRouter;