const {createLogger,format,transports} = require('winston');

const options = {
    file: {
      level: 'info',
      filename: `${__dirname}/../logs/log-api.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };




const logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
        ),
    transports:[
        new transports.File({
            // maxsize: 5120000,
            maxsize:5120,
            maxFiles : 5,
            filename: `${__dirname}/../logs/log-api.log`
        }),
        new transports.Console({
            format:format.colorize(),
            level:'debug',
        })
    ],
})


module.exports = logger;

