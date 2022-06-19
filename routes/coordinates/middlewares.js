import {
    validateLandingRequest,
    validateMoveRequest,
} from '../../validation/coordinatesRequestValidation.js'
import { RESPONSE_CONSTANTS } from '../../response/constants.js'
import { basicResponseWrapper } from '../../response/wrappers.js'
import ErrorModel from '../../response/models/ErrorModel.js'

const { BAD_REQUEST_CODE, BAD_REQUEST_MESSAGE } = RESPONSE_CONSTANTS

const sendBadRequestResponse = (response) => {
    const responseObject = ErrorModel(BAD_REQUEST_MESSAGE)
    const wrappedResponseObject = basicResponseWrapper(responseObject)
    response.status(BAD_REQUEST_CODE).send(wrappedResponseObject)
}

const beforeHandlerCalled = {
    landingRequestValidation: (request, response, next) => {
        if (validateLandingRequest(request.body).isValid) next()
        else sendBadRequestResponse(response)
    },
    moveRequestValidation: (request, response, next) => {
        if (validateMoveRequest(request.body).isValid) next()
        else sendBadRequestResponse(response)
    },
}

export { beforeHandlerCalled }
