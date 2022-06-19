import {
    processCoordinates,
    processMove,
    getCurrentCoordinates,
} from '../../core/services/coordinatesService.js'
import CoordinatesModel from '../../response/models/CoordinatesModel.js'
import ErrorModel from '../../response/models/ErrorModel.js'
import { RESPONSE_CONSTANTS } from '../../response/constants.js'
import { basicResponseWrapper } from '../../response/wrappers.js'

const {
    OK_CODE,
    NO_CONTENT_CODE,
    INTERNAL_ERROR_CODE,
    INTERNAL_ERROR_MESSAGE,
} = RESPONSE_CONSTANTS

const getCurrentCoordinatesHandler = async (request, response) => {
    try {
        const coordinates = await getCurrentCoordinates()
        if (coordinates !== null) {
            const responseObject = CoordinatesModel(coordinates)
            const wrappedResponseObject = basicResponseWrapper(responseObject)
            response.status(OK_CODE).send(wrappedResponseObject)
        } else {
            response.status(NO_CONTENT_CODE)
        }
    } catch (err) {
        response
            .status(INTERNAL_ERROR_CODE)
            .send(basicResponseWrapper(ErrorModel(INTERNAL_ERROR_MESSAGE)))
    }
}

const landingHandler = async (request, response) => {
    let statusCode, responseObject

    try {
        await processCoordinates(request.body.data)
        statusCode = OK_CODE
        responseObject = CoordinatesModel(request.body.data)
    } catch (STORAGE_ERROR) {
        statusCode = INTERNAL_ERROR_CODE
        responseObject = ErrorModel(INTERNAL_ERROR_MESSAGE)
    }

    const wrappedResponseObject = basicResponseWrapper(responseObject)
    response.status(statusCode).send(wrappedResponseObject)
}

const moveHandler = async (request, response) => {
    let statusCode, responseObject
    try {
        const moveResult = await processMove(request.body.data.move)
        if (moveResult.isMoved) {
            statusCode = OK_CODE
            responseObject = CoordinatesModel(moveResult.coordinates)
        } else {
            statusCode = NO_CONTENT_CODE
        }
    } catch (err) {
        statusCode = INTERNAL_ERROR_CODE
        responseObject = ErrorModel(INTERNAL_ERROR_MESSAGE)
    }
    const wrappedResponseObject = basicResponseWrapper(responseObject)
    response.status(statusCode).send(wrappedResponseObject)
}

export { landingHandler, moveHandler, getCurrentCoordinatesHandler }
