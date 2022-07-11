import admin from 'firebase-admin'

function initialize() {
  admin.initializeApp({
    credential: admin.credential.cert('../../serviceAccount.json')
  })
}

export default { initialize }
