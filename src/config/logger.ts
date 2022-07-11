import pino from 'pino'

const logger = pino({
  // transport:
  //   envs.environment == 'development'
  //     ? {
  //         target: 'pino-pretty',
  //         options: {
  //           colorize: true,
  //           translateTime: 'SYS:standard'
  //         }
  //       }
  //     : undefined,
  messageKey: 'message',
  timestamp: () => {
    return `,"time":"${new Date().toLocaleString()}`
  },

  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() }
    }
  }
})

export { logger }
