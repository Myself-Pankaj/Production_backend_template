import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports/index.js'
import util from 'util'
import config from '../config/config.js'
import { e_app_env } from '../constants/appenv.js'
import moment from 'moment-timezone'
import { fileURLToPath } from 'url'
import path from 'path'
import { blue, cyan, magenta, red, yellow } from 'colorette'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const formatTimeZone = (timestamp: string) => {
    const ans: string = moment(timestamp).tz('Asia/Kolkata').format('DD MMM YYYY HH:mm:ss')

    return ans
}

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = colorizeLevel(level.toUpperCase())

    const customTimeStamp = cyan(formatTimeZone(timestamp as string))

    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\n${magenta('META')} ${customMeta}`

    return customLog
})
const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.env == e_app_env.DEV) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const logMeta: Record<string, unknown> = {}

    if (typeof meta === 'object' && meta !== null && !Array.isArray(meta)) {
        for (const [key, val] of Object.entries(meta)) {
            if (val instanceof Error) {
                logMeta[key] = {
                    name: val.name,
                    message: val.message,
                    trace: val.stack || ''
                }
            } else {
                logMeta[key] = val
            }
        }
    }
    const timestamps = formatTimeZone(timestamp as string)
    const logData = {
        level: level.toUpperCase(),
        message,
        timestamps,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})
const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.env}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}
const logger = createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport(), ...fileTransport()]
})

export default logger

function colorizeLevel(level: string) {
    switch (level.toUpperCase()) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}
