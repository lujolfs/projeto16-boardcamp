import {db} from "../database/database.js";

export async function create (req, res) {
    const {name, phone, cpf, birthday} = req.body;

    try {
        await db.query(
            `
            INSERT INTO customers
                (name, phone, cpf, birthday)
            VALUES
                ($1, $2, $3, $4);
            `,
            [name, phone, cpf, birthday]
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
                id=$1;
            `, [id]
        );
        res.send(rows);
    } catch(err) {
        res.status(500).send(err.message)
    }
}

export async function update (req, res) {
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;

    try {
        await db.query(`
        UPDATE
            customers
        SET
            name=$1, phone=$2, cpf=$3, birthday=$4
        WHERE
            id=$5;
        `, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    } catch(err) {
        res.status(500).send(err.message);
    }
}