import { Router } from "express";
import { create, findAll, findById, update } from "../controllers/customers.controller.js";

const customersRouter = Router();

customersRouter.post("/customers", create);
customersRouter.get("/customers", findAll);

export default customersRouter;