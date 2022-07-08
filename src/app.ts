import express from 'express'
import { v1Router } from './api/ApiRouter.v1'
import handleError from './middleware/ErrorHandlerMiddleware'
import swaggerUi from 'swagger-ui-express'
import { swaggerSetup } from './config/swagger'

const app = express()

app.use(express.json())

app.use(v1Router)

app.use(handleError)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

export { app }

// TODO Add test framework: Chai, Mocha or Jest

// TODO API Monitoring and Dashoboards: DataDog, Splunk, Zabbix, New Relic, App Dynamics, Pingdom and UptimeRobot

/* TODO Add unhandled and uncaught exception

 process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  errorManagement.handler.handleError(error);
  if (!errorManagement.handler.isTrustedError(error))
    process.exit(1);
});

 */

/* TODO Maybe add Joi or Yup for validating arguments, like request arguments

const memberSchema = Joi.object().keys({
 password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
 birthyear: Joi.number().integer().min(1900).max(2013),
 email: Joi.string().email()
});

function addNewMember(newMember) {
 // assertions come first
 Joi.assert(newMember, memberSchema); //throws if validation fails
 // other logic here
}

*/
