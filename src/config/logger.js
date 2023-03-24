import winston from 'winston';

const WinstonConfig = {
    customLevels: {
        levels: {
            trace: 5,
            debug: 4,
            info: 3,
            warn: 2,
            error: 1,
            fatal: 0,
        },
        colors: {
            trace: 'white',
            debug: 'green',
            info: 'green',
            warn: 'yellow',
            error: 'red',
            fatal: 'red',
        },
    },
    formatter: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.splat(),
        winston.format.printf((info) => {
            const { timestamp, level, message, ...meta } = info;

            return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
        }),
    ),
    errorsFile: {
        filename: 'logs/error.log',
        level: 'error',
    },
    warningsFile: {
        filename: 'logs/warn.log',
        level: 'warn',
    }
}

const logger = winston.createLogger({
    levels: WinstonConfig.customLevels.levels,
    format: WinstonConfig.formatter,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File(WinstonConfig.errorsFile),
        new winston.transports.File(WinstonConfig.warningsFile),
    ],
});

export default logger;