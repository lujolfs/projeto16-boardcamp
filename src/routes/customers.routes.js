import { Router } from "express";
import { create, findAll, findById, update } from "../controllers/customers.controller.js";
import { schemaValidateCustomer } from "../middlewares/schemaValidateCustomers.js";

const customersRouter = Router();

customersRouter.post("/customers", schemaValidateCustomer, create);
customersRouter.get("/customers", findAll);
customersRouter.get("/customers/:id", findById);
customersRouter.get("/customers/:id", update);

export default customersRouter;