import swaggerJsDoc from 'swagger-jsdoc'
import { SwaggerOptions } from 'swagger-ui-express'

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Flashcards API',
      description: 'An API to for Flashcards App'
    },
    basePath: '/api/v1',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header'
      }
    }
  },
  apis: ['./src/controllers/*Controller.ts']
}

const swaggerSetup = swaggerJsDoc(swaggerOptions)
export { swaggerSetup }
