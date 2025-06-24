import { config } from 'dotenv-flow'

config()

export default {
    port: process.env.PORT,
    env: process.env.ENV,
    server_url: process.env.SERVER_URL,
    db_url: process.env.DB_URL,
    allowed_origin: process.env.ALLOWED_ORIGINS
}
