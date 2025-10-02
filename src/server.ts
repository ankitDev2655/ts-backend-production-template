import app from './app'
import config from './config/config'

const server = app.listen(config.PORT)

;(() => {
    try {
        // Database connection

        console.info(`APPLICATION_STARTED`, {
            meta: {
                PORT: config.PORT,
                ENV: process.env.NODE_ENV,
                SERVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        console.error('APPLICATION_FAILED', { meta: err })

        server.close(() => {
            if (err) {
                console.error('APPLICATION_CLOSED', { meta: err })
            }
            process.exit(1)
        })
    }
})()
