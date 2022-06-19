import { landingHandler } from '../../../../routes/coordinates/coordinatesHandlers'
import * as coordinatesService from '../../../../core/services/coordinatesService'
import { jest } from '@jest/globals'
import _ from 'lodash'
import StorageError from '../../../../core/errors/StorageError'

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

describe('landingHandler - check router coordinates handler', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('processCoordinates service method called', async () => {
        // Assign

        const processCoordinate_Spy = jest
            .spyOn(coordinatesService, 'processCoordinates')
            .mockReturnValue({})
        // Act
        await landingHandler(request, response)
        // Assert
        expect(processCoordinate_Spy).toHaveBeenCalledTimes(1)
    })

    it('correct response on success', async () => {
        // Assign
        jest.spyOn(coordinatesService, 'processCoordinates').mockReturnValue({})
        // Act
        await landingHandler(request, response)
        // Assert
        expect(response.code).toBe(200)
        const respCoordinates = response.respObj.data.coordinates
        expect(_.isEqual(respCoordinates, request.body.data)).toBe(true)
    })
    it('on storage error thrown', async () => {
        // Assign
        jest.spyOn(coordinatesService, 'processCoordinates').mockImplementation(
            () => {
                throw new StorageError()
            }
        )
        // Act
        await landingHandler(request, response)
        // Assert
        expect(response.code).toBe(500)
        const respMessage = response.respObj.data.errorMessage
        expect(respMessage).toBe('Internal Server Error')
    })
})
