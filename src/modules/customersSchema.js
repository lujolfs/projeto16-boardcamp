import joi from "joi";
import joiDate from "@joi/date";

const JoiDate = joi.extend(joiDate)

export const customerSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    birthday: JoiDate.date().format('YYYY-MM-DD')
})