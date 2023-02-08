import { Router } from "express";
import { findAll } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", findAll);

export default categoriesRouter;