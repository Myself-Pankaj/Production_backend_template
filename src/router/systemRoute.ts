import { Router } from 'express'
import systemController from '../controller/systemController.js'

const router = Router()

router.route('/system-info').get(systemController.self_status)
export default router
