import { Router } from 'express'
import apiController from '../controller/apiController'

const apiRouter = Router()

// Health API route
apiRouter.get('/health', (_req, res) => {
    res.json({
        success: true,
        status: 200,
        message: 'API is Healthy'
    })
})

apiRouter.route('/self').get(apiController.self)

export default apiRouter
