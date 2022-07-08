import 'dotenv/config'
import process from 'process'

interface MongoConfig {
  host: string
  user: string
  password: string
  port: string | number
}

class Envs {
  public environment: string
  public mongoConfig: MongoConfig

  constructor() {
    this.environment = process.env.ENVIRONMENT || 'development'

    this.mongoConfig = {
      host: process.env.MONGO_HOST,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      port: process.env.MONGO_PORT
    }
  }
}

export default new Envs()
