import * as coordinatesRequestValidation from '../../../../validation/coordinatesRequestValidation'
import { beforeHandlerCalled } from '../../../../routes/coordinates/middlewares'
import { jest } from '@jest/globals'

const request = {
    body: {
        data: { x: 1, y: 2, direction: 'NORTH' },
    },
}
const response = {
    status: function (code) {
        let self = this
        this.code = code
        return {
            send: (obj) => {
                self.respObj = obj
            },
        }
    },
    code: undefined,
    respObj: undefined,
}

describe('beforeHandlerCalled.landingRequestValidation tests', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('validation success', () => {
        // Assign
        const nextMock = jest.fn().mockReturnValue(null)
        const validateLandingRequest_Spy = jest
            .spyOn(coordinatesRequestValidation, 'validateLandingRequest')
            .mockReturnValue({ isValid: true, message: null })
        // Act
        beforeHandlerCalled.landingRequestValidation(
            request,
            response,
            nextMock
        )
        // Assert
        expect(validateLandingRequest_Spy).toHaveBeenCalledTimes(1)
        expect(nextMock.mock.calls.length).toBe(1)
    })

    it('validation failed', () => {
        // Assign
        const nextMock = jest.fn().mockReturnValue(null)
        const validateLandingRequest_Spy = jest
            .spyOn(coordinatesRequestValidation, 'validateLandingRequest')
            .mockReturnValue({ isValid: false, message: null })
        // Act
        beforeHandlerCalled.landingRequestValidation(
            request,
            response,
            nextMock
        )
        // Assert
        expect(validateLandingRequest_Spy).toHaveBeenCalledTimes(1)
        expect(nextMock.mock.calls.length).toBe(0)
        expect(response.code).toBe(400)
        expect(response.respObj.data.errorMessage).toBe('Bad Request')
    })
})

describe('beforeHandlerCalled.moveRequestValidation tests', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('validation success', () => {
        // Assign
        const nextMock = jest.fn().mockReturnValue(null)
        const validateMoveRequest_Spy = jest
            .spyOn(coordinatesRequestValidation, 'validateMoveRequest')
            .mockReturnValue({ isValid: true, message: null })
        // Act
        beforeHandlerCalled.moveRequestValidation(request, response, nextMock)
        // Assert
        expect(validateMoveRequest_Spy).toHaveBeenCalledTimes(1)
        expect(nextMock.mock.calls.length).toBe(1)
    })

    it('validation failed', () => {
        // Assign
        const nextMock = jest.fn().mockReturnValue(null)
        const validateMoveRequest_Spy = jest
            .spyOn(coordinatesRequestValidation, 'validateMoveRequest')
            .mockReturnValue({ isValid: false, message: null })
        // Act
        beforeHandlerCalled.moveRequestValidation(request, response, nextMock)
        // Assert
        expect(validateMoveRequest_Spy).toHaveBeenCalledTimes(1)
        expect(nextMock.mock.calls.length).toBe(0)
        expect(response.code).toBe(400)
        expect(response.respObj.data.errorMessage).toBe('Bad Request')
    })
})
