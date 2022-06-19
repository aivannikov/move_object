import { getCurrentCoordinatesHandler } from "../../../../routes/coordinates/coordinatesHandlers";
import * as coordinatesService from '../../../../core/services/coordinatesService' 
import StorageError from "../../../../core/errors/StorageError";
import { jest } from '@jest/globals'
import _ from 'lodash'

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


describe("getCurrentCoordinatesHandler tests", () => {
    it("getCurrentCoordinatesHandler call - no errors", async() => {
        // Assign
        const currentCoordinates = {
            x: 100,
            y: 400,
            direction: "SOUTH"
          }
        const getCurrentCoordinates_Spy = jest
            .spyOn(coordinatesService, 'getCurrentCoordinates')
            .mockReturnValue(currentCoordinates)
        //Act
        await getCurrentCoordinatesHandler(request, response);
        // Assert
        expect(getCurrentCoordinates_Spy).toHaveBeenCalledTimes(1)
        expect(response.code).toBe(200)
        const respCoordinates = response.respObj.data.coordinates
        expect(_.isEqual(respCoordinates, currentCoordinates)).toBe(true)
    });
    it("getCurrentCoordinatesHandler call - error", async() => {
        // Assign
        jest
            .spyOn(coordinatesService, 'getCurrentCoordinates').mockImplementation(
            () => {
                throw new StorageError()
            }
        );
        // Act
        await getCurrentCoordinatesHandler(request, response);
        // Assert
        expect(response.code).toBe(500)
        const respMessage = response.respObj.data.errorMessage
        expect(respMessage).toBe('Internal Server Error')

    });
});