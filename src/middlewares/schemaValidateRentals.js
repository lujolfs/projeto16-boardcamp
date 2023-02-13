import {db} from "../database/database.js";
import { rentalSchema } from "../modules/rentalsSchema.js";

export async function schemaValidateRentedGame (req, res, next) {
    const rented = req.body;

    const {error} = rentalSchema.validate(rented, {abortEarly: false});

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const rentedGame = await db.query(
        `SELECT * FROM games WHERE id=$1;`,
        [rented.gameId]);
        if (!rentedGame.rows[0]) {
            return res.sendStatus(400)
        } else {
        const renter = await db.query(
        `SELECT * FROM customers WHERE id=$1;`, [rented.customerId]);
            if (!renter.rows[0]) {
                return res.sendStatus(400)
            } else if (rentedGame.rows[0].stockTotal < 1) {
                return res.sendStatus(400)
            }
        }}
    catch (error) {
        return res.sendStatus(401);
    }

    req.rentedObject = rented;
    next();
    return;
}