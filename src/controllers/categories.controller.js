import { db } from "../database/database.js";

export async function findAll (req, res) {
    try {
        const { rows } = await db.query(`SELECT * FROM categories;`);
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}