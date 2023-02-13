import {db} from "../database/database.js";
import { gameSchema } from "../modules/gamesSchema.js";

export async function schemaValidateGame (req, res, next) {
    const game = req.body;

    const {error} = gameSchema.validate(game, {abortEarly: false});

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try {
        const {rows} = await db.query(`
        SELECT COUNT
            (*)
        FROM
            games
        WHERE
            name=$1;`, [game.name]);
        if (rows[0].count !== "0") {
            return res.sendStatus(409)
        }
    } catch (error) {
        return res.sendStatus(401);
    }

    req.gameObject = game;
    next();
    return;
}