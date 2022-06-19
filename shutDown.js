import RedisClient from './core/storage/redisClient.js'

let callCounter = 0

const startGracefulShutdown = async (server) => {
    callCounter++
    if (callCounter === 1) {
        server.close(async () => {
            await RedisClient.getInstance().quit()
            console.log('start exiting node process.')
            process.exit(0)
        })
    }
}

export default startGracefulShutdown
