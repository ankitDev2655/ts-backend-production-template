import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import config from '../config/config'
import { EApllicationEnvironement } from '../constant/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'

//Linking source map support to get proper stack traces in case of errors
sourceMapSupport.install()

const consoleLoggerFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = level.toUpperCase()
    const customTimestamp = timestamp

    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customMetaStr: string = String(customMeta)

    const customLog = `${String(customLevel)} [${String(customTimestamp)}]: ${String(customMessage)} \n  ${'META'} : ${String(customMetaStr)} \n`
    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApllicationEnvironement.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLoggerFormat)
            })
        ]
    }
    return []
}

const fileLoggerFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const logtMeta: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
        if (value instanceof Error) {
            logtMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || 'no stack trace'
            }
        } else {
            logtMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        timestamp,
        message,
        meta: logtMeta
    }

    return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../../logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLoggerFormat)
        })
    ]
}

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...fileTransport(), ...consoleTransport()]
})
