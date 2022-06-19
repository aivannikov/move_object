import { getCurrentCoordinates } from '../../../../core/services/coordinatesService'

import RedisClient from '../../../../core/storage/redisClient'
import * as envVars from '../../../../conf/envVars'
import StorageError from '../../../../core/errors/StorageError'
import { jest } from '@jest/globals'
import _ from 'lodash'

describe('getCurrentCoordinates service method', () => {
    it('is redis get called via SingleTone - no errors', async () => {
        // Assign
        const coordinatesFromRedis =
            '{"data":{"coordinates":{"x":100,"y":400,"direction":"SOUTH"}}}'
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest.fn().mockReturnValue(coordinatesFromRedis),
        })
        const redisKey = 'someKey'
        jest.spyOn(envVars, 'default').mockReturnValue({
            COORDINATES_HASH_KEY: redisKey,
        })
        RedisClient.getInstance = getInstance_Mock
        // Act
        const actualCoordinates = await getCurrentCoordinates()
        // Assert
        const coordinatesFromRedisParsed = JSON.parse(coordinatesFromRedis)
        expect(_.isEqual(actualCoordinates, coordinatesFromRedisParsed)).toBe(
            true
        )
        expect(getInstance_Mock().get).toHaveBeenCalledTimes(1)
        expect(getInstance_Mock().get).toHaveBeenCalledWith(redisKey)
    })
    it('is redis get throws error', async () => {
        // Assign
        const getInstance_Mock = jest.fn().mockReturnValue({
            get: jest.fn().mockImplementation(() => {
                throw new Error()
            }),
        })
        const redisKey = 'someKey'
        jest.spyOn(envVars, 'default').mockReturnValue({
            COORDINATES_HASH_KEY: redisKey,
        })
        RedisClient.getInstance = getInstance_Mock
        // Act Assert
        expect(async () => await getCurrentCoordinates()).rejects.toThrow(
            new StorageError('Unable to get data from redis')
        )
    })
})
