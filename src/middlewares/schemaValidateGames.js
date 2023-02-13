import {db} from "../database/database.js";
import { gameSchema } from "../modules/gamesSchema.js";

export async function schemaValidateGame (req, res, next) {
    const game = req.body;

    const {error} = gameSchema.validate(game, {abortEarly: false});

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const nameExists = await db.query(`
        SELECT
            *
        FROM
            games
        WHERE
            `)
    }
}