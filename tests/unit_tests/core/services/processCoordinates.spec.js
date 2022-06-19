import { processCoordinates } from '../../../../core/services/coordinatesService'
import RedisClient from '../../../../core/storage/redisClient'
import * as envVars from '../../../../conf/envVars'
import StorageError from '../../../../core/errors/StorageError'
import { jest } from '@jest/globals'

describe('processCoordinates service method - check redis called', () => {
    it('is redis set called via SingleTone - no errors', async () => {
        // Assign
        const getInstance_Mock = jest.fn().mockReturnValue({
            set: jest.fn().mockReturnValue(null),
        })
        const redisKey = 'someKey'
        jest.spyOn(envVars, 'default').mockReturnValue({
            COORDINATES_HASH_KEY: redisKey,
        })
        RedisClient.getInstance = getInstance_Mock
        const args = { a: 1, b: 2 }
        // Act
        await processCoordinates(args)
        // Assert
        expect(getInstance_Mock().set).toHaveBeenCalledTimes(1)
        expect(getInstance_Mock().set).toHaveBeenCalledWith(
            redisKey,
            JSON.stringify(args)
        )
    })

    it('is redis set called via SingleTone - STORAGE_ERROR', async () => {
        // Assign
        const getInstance_Mock = jest.fn().mockReturnValue({
            set: jest.fn().mockImplementation(() => {
                throw new Error()
            }),
        })
        RedisClient.getInstance = getInstance_Mock
        // Act Assert
        expect(async () => await processCoordinates({})).rejects.toThrow(
            new StorageError('Unable to set data')
        )
    })
})
