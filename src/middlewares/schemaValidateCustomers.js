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

export async function schemaValidateCustomerUpdate (req, res, next) {
    const customer = req.body;
    const {id} = req.params;
    const matchSearch = db.query(`SELECT * FROM customers WHERE cpf=$1;`, [customer.cpf]);
    const idMatch = db.query (`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`, [customer.name, customer.phone, customer.cpf, customer.birthday, id])

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
            const searchResult = await matchSearch;
            res.send(searchResult.rows[0])
                if (rows[0].id == id) {
                    await idMatch
                    return res.sendStatus(200)
                } else {
                    return res.sendStatus(409)
                }}
        else {
            await idMatch;
            return res.sendStatus(200);
        }
        } catch (error) {
        return res.sendStatus(401);
    }

    req.customerObject = customer;
    next();
    return;
}
