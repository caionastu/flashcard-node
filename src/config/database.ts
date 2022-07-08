import mongoose from 'mongoose'
import 'dotenv/config'
import Envs from './envs'

const port = Envs.mongoConfig.port
const host = Envs.mongoConfig.host
const user = Envs.mongoConfig.user
const password = Envs.mongoConfig.password
const dbUri = `mongodb://${user}:${password}@${host}:${port}`

console.log(dbUri)
mongoose.connection.on('open', () => {
  console.log(`Connected to database on host ${host}.`)
})

mongoose.connection.on('error', () => {
  console.error(`Could not connect to database on host ${host}.`)
})

mongoose.Promise = global.Promise

export default {
  connect: () => mongoose.connect(dbUri)
}
