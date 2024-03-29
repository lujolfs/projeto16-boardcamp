import {db} from "..//database/database.js";
import dayjs from "dayjs"

export async function create (req, res) {
    const { customerId, gameId, daysRented } = req.rentedObject;
    const rentDate = dayjs().format('YYYY-MM-DD')
    let pricePerDay
    
    if (daysRented <= 0) {
        return res.sendStatus(400);
    }

    try {
        const {rows} = await db.query(
            `SELECT * FROM games WHERE id=$1;`,
            [gameId]
        );
        pricePerDay = rows[0].pricePerDay;
        await db.query(`
        UPDATE games SET "stockTotal"=$1 WHERE id=$2`, [((rows[0].stockTotal)-1),gameId]);
    } catch(err) {
        res.status(500).send(err.message);
    }

    try {
        const originalPrice = pricePerDay * daysRented;
        await db.query(
            `INSERT INTO rentals
                ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES
                ($1, $2, $3, $4, $5, $6, $7);`,
                [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findAll (req, res) {
    try {
        const rentalsForm = await db.query(`
        SELECT 
            rentals.id,
            rentals."customerId",
            rentals."gameId",
            rentals."rentDate"::text,
            rentals."daysRented",
            rentals."returnDate"::text,
            rentals."originalPrice",
            rentals."delayFee",
            JSON_BUILD_OBJECT(
                'id', customers.id,
                'name', customers.name
            ) AS customer,
            JSON_BUILD_OBJECT(
                'id', games.id,
                'name', games.name)
            AS game
        FROM 
            customers
        JOIN
            rentals
        ON
            customers.id = rentals."customerId"
        JOIN
            games
        ON
            rentals."gameId" = games.id;`);
        res.send(rentalsForm.rows);
        } catch (err) {
            res.status(500).send(err.message)
        }
}

export async function finish (req, res) {
    const { id } = req.params;
    const returnDate = dayjs().format('YYYY-MM-DD')

    try {
        const findRental = await db.query (`
            SELECT * FROM rentals WHERE id=$1;`, [id]
        )
        const date1 = dayjs(findRental.rows[0].rentDate)
        if (!findRental.rows[0]) {
            return res.sendStatus(404);
        } else if (findRental.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        } else if (date1.diff(returnDate, 'day') > findRental.rows[0].daysRented) { 
        await db.query(
            `UPDATE
                rentals
            SET
                "returnDate"=$1, "delayFree"=$2 WHERE id=$3;`,
            [returnDate, id]
            );
            const findGame = await db.query(`SELECT * FROM games WHERE id=$1`, [findRental.rows[0].gameId])
            await db.query(`
            UPDATE games SET "stockTotal"=$1 WHERE id=$2`, [((findGame.rows[0].stockTotal)+1),findRental.rows[0].gameId]
            );
            res.sendStatus(200);
        } else {
        await db.query(
            `UPDATE
                rentals
            SET
                "returnDate"=$1 WHERE id=$2;`,
            [returnDate, id]
        );
        const findGame = await db.query(`SELECT * FROM games WHERE id=$1`, [findRental.rows[0].gameId])
        await db.query(`
        UPDATE games SET "stockTotal"=$1 WHERE id=$2`, [((findGame.rows[0].stockTotal)+1),findRental.rows[0].gameId]
        );
        res.sendStatus(200);
    }} catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRent (req, res) {
    const {id} = req.params;
    
    try {
        const findRental = await db.query (`
        SELECT * FROM rentals WHERE id=$1;`, [id])
            if (!findRental.rows[0]) {
        return res.sendStatus(404);
        } else if (findRental.rows[0].returnDate === null) {
            return res.sendStatus(400);
        } 
        else {
        await db.query(
            `DELETE FROM rentals WHERE id=$1`, [id]
        );
        res.sendStatus(200);}
    } catch (err) {
        res.status(500).send(err.message);
    }
}