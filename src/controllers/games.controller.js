import {db} from "../database/database.js";

export async function create (req, res) {
    const {name, image, stockTotal, pricePerDay} = req.gameObject;

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
        const {rows} = await db.query(`
        SELECT
            *
        FROM
            games
        `);
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function queryTest (req, res) {
    const {name} = req.body;
    try {
        const {rows} = await db.query(`
        SELECT COUNT
            (*)
        FROM
            games
        WHERE
            name=$1;`, [name]);
        res.send(rows[0].count);
    } catch(err) {
        res.status(500).send(err.message)
    }
}