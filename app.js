import express, { json } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './routes/router.js'
import getEnvVars from './conf/envVars.js'
import { startRedis } from './startup.js'
import startGracefulShutdown from './shutDown.js'

const app = express()
dotenv.config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)

const PORT = getEnvVars().APP_PORT || 3000

app.get('/', async (req, res) => {
    res.json({ status: true, message: 'Our node.js app works' })
})

await startRedis()
const server = app.listen(PORT, () =>
    console.log(`App listening at port ${PORT}`)
)

process.on('SIGINT', async () => {
    await startGracefulShutdown(server)
})
