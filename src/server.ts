import app from './app'
import config from './config/config'
import logger from './utils/logger'

const server = app.listen(config.PORT)

;(() => {
    try {
        // Database connection

        logger.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                ENV: process.env.NODE_ENV,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error('APPLICATION_FAILED', { meta: err })

        server.close(() => {
            if (err) {
                logger.error('APPLICATION_CLOSED', { meta: err })
            }
            process.exit(1)
        })
    }
})()
