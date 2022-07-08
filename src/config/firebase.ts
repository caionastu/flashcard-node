import admin from 'firebase-admin'

function initialize() {
  admin.initializeApp({
    credential: admin.credential.cert('src/serviceAccount.json')
  })
}

export default { initialize }
