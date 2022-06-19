import RedisClient from '../../../../core/storage/redisClient'
import { jest } from '@jest/globals'
import redis from 'redis'
jest.mock('redis', () => {
    return {
        createClient: ({ url }) => {
            return {
                isCreated: true,
                url: url,
            }
        },
    }
})

describe('RedisClient Singletone - check redis is called, and not changed.', () => {
    it('redis.createClient is called and instance is created, is correct conn string passed', () => {
        // Assign
        const argsObject = {
            userName: 'usr',
            password: '123',
            host: 'some_host',
            port: '80',
        }
        const argsObject_secondCall = {
            userName: '',
            password: '',
            host: '',
            port: '',
        }
        // Act
        const redisClient = new RedisClient(argsObject)
        new RedisClient(argsObject_secondCall)
        // Assert
        expect(redisClient.isCreated).toBe(true)
        expect(RedisClient.getInstance().isCreated).toBe(true)
        expect(RedisClient.getInstance().url).toBe(
            `redis://${argsObject.userName}:${argsObject.password}@${argsObject.host}:${argsObject.port}`
        )
    })
})
