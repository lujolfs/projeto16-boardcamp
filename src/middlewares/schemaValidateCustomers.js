import {db} from "../database/database.js";
import { customerSchema } from "../modules/customersSchema.js";

export async function schemaValidateCustomer (req, res, next) {
    const customer = req.body;

    const {error} = customerSchema.validate(customer, {abortEarly: false});

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const {rows} = await db.query(`
        SELECT COUNT
            (*)
        FROM
            customers
        WHERE
            cpf=$1;`, [customer.cpf]);
        if (rows[0].count !== "0") {
            return res.sendStatus(409)
        }
    } catch (error) {
        return res.sendStatus(401);
    }

    req.customerObject = customer;
    next();
    return;
}