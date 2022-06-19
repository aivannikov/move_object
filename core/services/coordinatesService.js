import RedisClient from '../storage/redisClient.js'
//import { STORAGE_ERROR } from '../constants/errorCodes.js'
import StorageError from '../errors/StorageError.js'
import getEnvVars from '../../conf/envVars.js'
import CoordinatesCalculator from '../business_logic/manageMove.js'

const processCoordinates = async (inputCoordinatesJson) => {
    const { COORDINATES_HASH_KEY: COORDINATES_HASH_KEY } = getEnvVars()
    try {
        await RedisClient.getInstance().set(
            COORDINATES_HASH_KEY,
            JSON.stringify(inputCoordinatesJson)
        )
    } catch (err) {
        throw new StorageError('Unable to set data')
    }
}

const getCurrentCoordinates = async () => {
    try {
        const { COORDINATES_HASH_KEY } = getEnvVars()
        return JSON.parse(
            await RedisClient.getInstance().get(COORDINATES_HASH_KEY)
        )
    } catch (err) {
        throw new StorageError('Unable to get data from redis')
    }
}

const processMove = async (move) => {
    const { COORDINATES_HASH_KEY } = getEnvVars()
    let latestCoordinates
    try {
        latestCoordinates = await RedisClient.getInstance().get(
            COORDINATES_HASH_KEY
        )
        if (latestCoordinates !== null) {
            const calculator = new CoordinatesCalculator(
                JSON.parse(latestCoordinates)
            )
            calculator.calculate(move)
            const newCoordinates = {
                x: calculator.x,
                y: calculator.y,
                direction: calculator.direction,
            }
            await RedisClient.getInstance().set(
                COORDINATES_HASH_KEY,
                JSON.stringify(newCoordinates)
            )
            return { isMoved: true, coordinates: newCoordinates }
        }
        return { isMoved: false, coordinates: null }
    } catch (err) {
        throw new StorageError('Unable to set data')
    }
}

export { processCoordinates, processMove, getCurrentCoordinates }
