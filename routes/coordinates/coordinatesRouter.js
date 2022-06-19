import { Router } from 'express'
import { beforeHandlerCalled } from './middlewares.js'
import {
    landingHandler,
    moveHandler,
    getCurrentCoordinatesHandler,
} from './coordinatesHandlers.js'

const coordinatesRouter = new Router()
coordinatesRouter.post(
    '/landing',
    beforeHandlerCalled.landingRequestValidation,
    landingHandler
)
coordinatesRouter.post(
    '/move',
    beforeHandlerCalled.moveRequestValidation,
    moveHandler
)
coordinatesRouter.get('/', getCurrentCoordinatesHandler)

export default coordinatesRouter
