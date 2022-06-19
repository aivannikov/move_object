import CoordinatesCalculator from '../../../../core/business_logic/manageMove'

describe('CoordinatesCalculator tests', () => {
    it('Check is calculated correctly', () => {
        let calculator = new CoordinatesCalculator({
            x: 12,
            y: -4,
            direction: 'EAST',
        })
        calculator.calculate('LLFBFRF')
        expect(calculator.x).toBe(11)
        expect(calculator.y).toBe(-3)
        expect(calculator.direction).toBe('NORTH')
    })
})
