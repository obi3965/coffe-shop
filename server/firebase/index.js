
const admin = require("firebase-admin");

const serviceAccount = require("../config/fbServiceAccountKey.json.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:"https://coffeeshop-fc136.firebaseapp.com"
});

module.exports = admin