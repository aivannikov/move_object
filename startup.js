import RedisClient from './core/storage/redisClient.js'
import getEnvVars from './conf/envVars.js'

const startRedis = async () => {
    const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOSTNAME, REDIS_PORT } =
        getEnvVars()
    new RedisClient({
        userName: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        host: REDIS_HOSTNAME,
        port: REDIS_PORT,
    })
    await RedisClient.getInstance().connect()
}

export { startRedis }
