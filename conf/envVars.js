const getEnvVars = () => {
    return {
        REDIS_USERNAME: process.env.REDIS_USERNAME,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        REDIS_HOSTNAME: process.env.REDIS_HOSTNAME,
        REDIS_PORT: process.env.REDIS_PORT,
        COORDINATES_HASH_KEY: process.env.COORDINATES_HASH_KEY,
        APP_PORT: process.env.APP_PORT,
    }
}

export default getEnvVars
