import redis from 'redis'

class RedisClient {
    static #_instance
    constructor({ userName, password, host, port }) {
        if (!RedisClient.#_instance) {
            RedisClient.#_instance = redis.createClient({
                url: `redis://${userName}:${password}@${host}:${port}`,
            })
        }
        return RedisClient.#_instance
    }

    static getInstance() {
        return RedisClient.#_instance
    }
}

export default RedisClient
