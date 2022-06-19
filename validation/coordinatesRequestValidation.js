import Joi from 'joi'
import { DIRECTION_CONSTANTS } from '../core/constants/direction.js'
const { NORTH, SOUTH, EAST, WEST } = DIRECTION_CONSTANTS

const runValidate = (schema, jsonData) => {
    const { error, value } = schema.validate(jsonData)

    if (error) return { isValid: false, message: error.message }

    return { isValid: true, message: null }
}

const validateLandingRequest = (jsonData) => {
    const landingSchema = Joi.object({
        data: Joi.object({
            x: Joi.number().required(),
            y: Joi.number().required(),
            direction: Joi.string().valid(NORTH, SOUTH, EAST, WEST).required(),
        }).required(),
    })

    return runValidate(landingSchema, jsonData)
}

const validateMoveRequest = (jsonData) => {
    const moveSchema = Joi.object({
        data: Joi.object({
            move: Joi.string()
                .regex(/^[FBLR]+$/)
                .required(),
        }).required(),
    })

    return runValidate(moveSchema, jsonData)
}

export { validateLandingRequest, validateMoveRequest }
