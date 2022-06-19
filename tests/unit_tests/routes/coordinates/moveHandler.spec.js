import { moveHandler } from '../../../../routes/coordinates/coordinatesHandlers'
import * as coordinatesService from '../../../../core/services/coordinatesService'
import * as coordinatesRequestValidation from '../../../../validation/coordinatesRequestValidation'
import { jest } from '@jest/globals'
import _ from 'lodash'

const request = {
    body: {
        data: { move: 'LLRR' },
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

describe('moveHandler - check router coordinates handler', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('is processMove service function called', async () => {
        // Assign
        jest.spyOn(
            coordinatesRequestValidation,
            'validateMoveRequest'
        ).mockReturnValue({ isValid: true, message: null })
        const processMove_Spy = jest
            .spyOn(coordinatesService, 'processMove')
            .mockReturnValue({
                isMoved: true,
                coordinates: { x: 1, y: 2, direction: 'NORTH' },
            })

        // Act
        await moveHandler(request, response)
        // Assert
        expect(processMove_Spy).toHaveBeenCalledTimes(1)
    })

    it('correct response on success', async () => {
        // Assign
        const validateMoveRequest_Spy = jest
            .spyOn(coordinatesRequestValidation, 'validateMoveRequest')
            .mockReturnValue({ isValid: true, message: null })
        const newLocation_Fake = { x: 1, y: 2, direction: 'NORTH' }
        const processMove_Spy = jest
            .spyOn(coordinatesService, 'processMove')
            .mockReturnValue({
                isMoved: true,
                coordinates: newLocation_Fake,
            })

        // Act
        await moveHandler(request, response)
        // Assert
        expect(response.code).toBe(200)
        const respCoordinates = response.respObj.data.coordinates
        expect(_.isEqual(respCoordinates, newLocation_Fake)).toBe(true)
    })

    it('was not moved', async () => {
        // Assign
        const validateMoveRequest_Spy = jest
            .spyOn(coordinatesRequestValidation, 'validateMoveRequest')
            .mockReturnValue({ isValid: true, message: null })

        const processMove_Spy = jest
            .spyOn(coordinatesService, 'processMove')
            .mockReturnValue({
                isMoved: false,
                coordinates: null,
            })

        // Act
        await moveHandler(request, response)
        // Assert
        expect(response.code).toBe(204)
    })

    it('on Storage error thrown', async () => {
        // Assign
        const validateMoveRequest_Spy = jest
            .spyOn(coordinatesRequestValidation, 'validateMoveRequest')
            .mockReturnValue({ isValid: true, message: null })

        const processMove_Spy = jest
            .spyOn(coordinatesService, 'processMove')
            .mockImplementation(() => {
                throw 'StorageError'
            })

        // Act
        await moveHandler(request, response)
        // Assert
        expect(response.code).toBe(500)
        const respMessage = response.respObj.data.errorMessage
        expect(respMessage).toBe('Internal Server Error')
    })
})
