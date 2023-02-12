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

export async function findAll (req, res) {
    try {
        const {rows} = await db.query("SELECT * FROM customers");
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findById (req, res) {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(404)
    }

    try {
        const {rows} = await db.query(
            `
            SELECT
                *
            FROM
                customers
            WHERE
                id=$1
            `, [id]
        );
        res.send(rows);
    } catch(err) {
        res.status(500).send(err.message)
    }
}