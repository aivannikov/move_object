import { validateMoveRequest } from '../../../validation/coordinatesRequestValidation'

describe('validateMoveRequest - check validation of move request', () => {
    it('Pass invalid json: empty, string instead of json', () => {
        // Assign
        const jsonEmpty = {}
        const stringAsArg = 'string insead of json'
        const numberAsArg = 34
        // Act
        const jsonEmptyResult = validateMoveRequest(jsonEmpty)
        const stringAsArgResult = validateMoveRequest(stringAsArg)
        const numberAsArgResult = validateMoveRequest(numberAsArg)
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

    it('Pass json without required fields', () => {
        // Assign
        const noDataField = { move: 'LLLRR' }
        const wrongJson = { id: 12 }
        const noMoveField = { data: { id: 12 } }
        const dataEmptyJson = { data: {} }
        const dataIsArray = { data: [] }
        // Act
        const noDataFieldResult = validateMoveRequest(noDataField)
        const wrongJsonResult = validateMoveRequest(wrongJson)
        const noMoveFieldResult = validateMoveRequest(noMoveField)
        const dataEmptyJsonResult = validateMoveRequest(dataEmptyJson)
        const dataIsArrayResult = validateMoveRequest(dataIsArray)
        // Assert
        expect(
            noDataFieldResult.isValid === false &&
                noDataFieldResult.message.length
        ).toBeTruthy()
        expect(
            wrongJsonResult.isValid === false && wrongJsonResult.message.length
        ).toBeTruthy()
        expect(
            noMoveFieldResult.isValid === false &&
                noMoveFieldResult.message.length
        ).toBeTruthy()
        expect(
            dataEmptyJsonResult.isValid === false &&
                dataEmptyJsonResult.message.length
        ).toBeTruthy()
        expect(
            dataIsArrayResult.isValid === false &&
                dataIsArrayResult.message.length
        ).toBeTruthy()
    })

    it('Pass invalid "move" field', () => {
        // Assign
        const invalidMoveLetters = { data: { move: 'JHLRHG' } }
        const invalidMoveSmallLetters = { data: { move: 'flfffrflb' } }
        const invalidMoveLettersNumbers = { data: { move: '238Jhdhsk' } }
        const invalidMoveSpecialCharacters = { data: { move: '#$RLBB' } }
        // Act
        const invalidMoveLettersResult = validateMoveRequest(invalidMoveLetters)
        const invalidMoveSmallLettersResult = validateMoveRequest(
            invalidMoveSmallLetters
        )
        const invalidMoveLettersNumbersResult = validateMoveRequest(
            invalidMoveLettersNumbers
        )
        const invalidMoveSpecialCharactersResult = validateMoveRequest(
            invalidMoveSpecialCharacters
        )
        // Assert
        expect(
            invalidMoveLettersResult.isValid === false &&
                invalidMoveLettersResult.message.length
        ).toBeTruthy()
        expect(
            invalidMoveSmallLettersResult.isValid === false &&
                invalidMoveSmallLettersResult.message.length
        ).toBeTruthy()
        expect(
            invalidMoveLettersNumbersResult.isValid === false &&
                invalidMoveLettersNumbersResult.message.length
        ).toBeTruthy()
        expect(
            invalidMoveSpecialCharactersResult.isValid === false &&
                invalidMoveSpecialCharactersResult.message.length
        ).toBeTruthy()
    })

    it('Pass valid json', () => {
        // Assign
        const forward = { data: { move: 'F' } }
        const forwardAndRight = { data: { move: 'FR' } }
        const backwardRightLeftForward = { data: { move: 'BRLFF' } }
        // Act
        const forwardResult = validateMoveRequest(forward)
        const forwardAndRightResult = validateMoveRequest(forwardAndRight)
        const backwardRightLeftForwardResult = validateMoveRequest(
            backwardRightLeftForward
        )
        // Assert
        expect(
            forwardResult.isValid && forwardResult.message === null
        ).toBeTruthy()
        expect(
            forwardAndRightResult.isValid &&
                forwardAndRightResult.message === null
        ).toBeTruthy()
        expect(
            backwardRightLeftForwardResult.isValid &&
                backwardRightLeftForwardResult.message === null
        ).toBeTruthy()
    })
})
