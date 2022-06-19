import { Router } from 'express'
import coordinatesRouter from './coordinates/coordinatesRouter.js'

const router = new Router()
router.use('/coordinates', coordinatesRouter)
export default router
