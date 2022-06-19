import { validateLandingRequest } from '../../../validation/coordinatesRequestValidation'

describe('validateLandingRequest - check validation of landing coordinates work', () => {
    it('Pass invalid json: empty, string instead of json', () => {
        // Assign
        const jsonEmpty = {}
        const stringAsArg = 'string insead of json'
        const numberAsArg = 34
        // Act
        const jsonEmptyResult = validateLandingRequest(jsonEmpty)
        const stringAsArgResult = validateLandingRequest(stringAsArg)
        const numberAsArgResult = validateLandingRequest(numberAsArg)
        // Assert
        expect(
            jsonEmptyResult.isValid === false && jsonEmptyResult.message.length
        ).toBeTruthy()
        expect(
            stringAsArgResult.isValid === false &&
                stringAsArgResult.message.length
        ).toBeTruthy()
        expect(
            numberAsArgResult.isValid === false &&
                numberAsArgResult.message.length
        ).toBeTruthy()
    })

    it('Pass incorrect json structure: no data field, incorrect field names, invalid "x", "y" or "direction"', () => {
        // Assign
        const noDataField = { x: 12, y: 10, direction: 'North' }
        const incorectFieldNames = { id: 12 }
        const invalidX = { data: { x: 'a', y: 12, direction: 'NORTH' } }
        const invalidY = { data: { x: 10, y: 'b', direction: 'NORTH' } }
        const invalidDirection = {
            data: { x: -10, y: 12, direction: 'Somewhere else' },
        }
        const invalidDirectionSmallLetters = {
            data: { x: 10, y: 12, direction: 'North' },
        }
        // Act
        const noDataFieldResult = validateLandingRequest(noDataField)
        const incorectFieldNamesResult =
            validateLandingRequest(incorectFieldNames)
        const invalidXResult = validateLandingRequest(invalidX)
        const invalidYResult = validateLandingRequest(invalidY)
        const invalidDirectionResult = validateLandingRequest(invalidDirection)
        const invalidDirectionSmallLettersResult = validateLandingRequest(
            invalidDirectionSmallLetters
        )
        // Assert
        expect(
            noDataFieldResult.isValid === false &&
                noDataFieldResult.message.length
        ).toBeTruthy()
        expect(
            incorectFieldNamesResult.isValid === false &&
                incorectFieldNamesResult.message.length
        ).toBeTruthy()
        expect(
            invalidXResult.isValid === false && invalidXResult.message.length
        ).toBeTruthy()
        expect(
            invalidYResult.isValid === false && invalidYResult.message.length
        ).toBeTruthy()
        expect(
            invalidDirectionResult.isValid === false &&
                invalidDirectionResult.message.length
        ).toBeTruthy()
        expect(
            invalidDirectionSmallLettersResult.isValid === false &&
                invalidDirectionSmallLettersResult.message.length
        ).toBeTruthy()
    })

    it('Missing "x", "y", or "direction"', () => {
        // Assign
        const missingX = { data: { y: 10, direction: 'NORTH' } }
        const missingY = { data: { x: 10, direction: 'NORTH' } }
        const missingDirection = { data: { x: 10, y: 10 } }
        // Act
        const missingXResult = validateLandingRequest(missingX)
        const missingYResult = validateLandingRequest(missingY)
        const missingDirectionResult = validateLandingRequest(missingDirection)
        // Assert
        expect(
            missingXResult.isValid === false && missingXResult.message.length
        ).toBeTruthy()
        expect(
            missingYResult.isValid === false && missingYResult.message.length
        ).toBeTruthy()
        expect(
            missingDirectionResult.isValid === false &&
                missingDirectionResult.message.length
        ).toBeTruthy()
    })

    it('Check all valid directions', () => {
        // Assign
        const north = { data: { x: 10, y: 10, direction: 'NORTH' } }
        const south = { data: { x: 10, y: 10, direction: 'SOUTH' } }
        const east = { data: { x: 10, y: 10, direction: 'EAST' } }
        const west = { data: { x: 10, y: 10, direction: 'WEST' } }
        // Act
        const northResult = validateLandingRequest(north)
        const southResult = validateLandingRequest(south)
        const eastResult = validateLandingRequest(east)
        const westResult = validateLandingRequest(west)
        // Assert
        expect(northResult.isValid && northResult.message === null).toBeTruthy()
        expect(southResult.isValid && southResult.message === null).toBeTruthy()
        expect(eastResult.isValid && eastResult.message === null).toBeTruthy()
        expect(westResult.isValid && westResult.message === null).toBeTruthy()
    })
})
