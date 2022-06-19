import { jest } from '@jest/globals'
import { processMove } from '../../../../core/services/coordinatesService'
import RedisClient from '../../../../core/storage/redisClient'
import CoordinatesCalculator from '../../../../core/business_logic/manageMove'
import StorageError from '../../../../core/errors/StorageError'

describe('processMove service method - check redis called', () => {
    it('is redis get set called via SingleTone - no errors', async () => {
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest
                .fn()
                .mockReturnValue('{"x": 1, "y": 2, "direction": "NORTH"}'),
            set: jest.fn().mockReturnValue(null),
        })
        RedisClient.getInstance = getInstance_Mock
        const result = await processMove('LLR')
        expect(getInstance_Mock().get).toHaveBeenCalledTimes(1)
        expect(getInstance_Mock().set).toHaveBeenCalledTimes(1)
    })
    it('is correct return value - redis get not null', async () => {
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest
                .fn()
                .mockReturnValue('{"x": 1, "y": 2, "direction": "NORTH"}'),
            set: jest.fn().mockReturnValue(null),
        })
        RedisClient.getInstance = getInstance_Mock
        const result = await processMove('LLR')
        expect(result.isMoved).toBe(true)
        expect(result.coordinates.x).toBe(1)
        expect(result.coordinates.y).toBe(2)
        expect(result.coordinates.direction).toBe('WEST')
    })
    it('is correct return value - redis get null', async () => {
        // Assign
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest.fn().mockReturnValue(null),
            set: jest.fn().mockReturnValue(null),
        })
        RedisClient.getInstance = getInstance_Mock
        // Act
        const result = await processMove('LLR')
        // Assert
        expect(result.isMoved).toBe(false)
    })
    it('redis get called - STORAGE_ERROR', async () => {
        // Assign
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest.fn().mockImplementation(() => {
                throw new Error()
            }),
            set: jest.fn().mockReturnValue(null),
        })
        RedisClient.getInstance = getInstance_Mock
        // Act Assert
        expect(async () => await processMove('LLR')).rejects.toThrow(
            new StorageError('Unable to set data')
        )
    })
    it('redis set called - STORAGE_ERROR', async () => {
        // Assign
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest
                .fn()
                .mockReturnValue('{"x": 1, "y": 2, "direction": "NORTH"}'),
            set: jest.fn().mockImplementation(() => {
                throw new Error()
            }),
        })
        RedisClient.getInstance = getInstance_Mock
        // Act Assert
        expect(async () => await processMove('LLR')).rejects.toThrow(
            new StorageError('Unable to set data')
        )
    })
    it('CoordinatesCalculator is called', async () => {
        // Assign
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest
                .fn()
                .mockReturnValue('{"x": 1, "y": 2, "direction": "NORTH"}'),
            set: jest.fn().mockReturnValue(null),
        })
        RedisClient.getInstance = getInstance_Mock
        const calculate_Spy = jest.spyOn(
            CoordinatesCalculator.prototype,
            'calculate'
        )
        // Act
        await processMove('LLR')
        // Assert
        expect(calculate_Spy).toHaveBeenCalledTimes(1)
    })
})
