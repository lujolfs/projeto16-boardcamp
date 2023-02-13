import joi from "joi";

export const rentalSchema = joi.object({
    customerId: joi.string().pattern(/^[0-9]+$/).required(),
    customerId: joi.string().pattern(/^[0-9]+$/).required(),
    daysRented: joi.string().pattern(/^[0-9]+$/).required()
})