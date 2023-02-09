import {db} from "../database/database.js";

export async function create (req, res) {
    const {name, phone, cpf, birthday} = req.body;

    if (!name || stockTotal < 0 || pricePerDay < 0) {
        return res.sendStatus(400)
    }

    try {
        await db.query(
            `
            INSERT INTO games
                (name, image, "stockTotal", "pricePerDay")
            VALUES
                ($1, $2, $3, $4);
            `,
            [name, image, stockTotal, pricePerDay]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}