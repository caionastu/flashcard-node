import { app } from './app'
import database from './config/database'
import firebase from './config/firebase'

const port = 3000

firebase.initialize()

database.connect().then(() => {
  app.listen(port, () => console.log(`Server is running on port: ${port}`))
})
