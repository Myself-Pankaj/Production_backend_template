import app from './app.js'
import config from './config/config.js'
import logger from './utils/logger.js'
const server = app.listen(config.port)

;(() => {
    try {
        //Database  connection

        logger.info('APP_STARTED', {
            meta: {
                PORT: config.port,
                SERVER_URL: config.server_url
            }
        })
    } catch (error) {
        logger.error('APP_ERROR', {
            meta: error
        })
        server.close((err) => {
            if (err) {
                logger.error('APP_ERROR', { meta: err })
            }
            process.exit(1)
        })
    }
})()
