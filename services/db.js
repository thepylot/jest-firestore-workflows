const firebaseAdmin =  require("firebase-admin")
const stateDetails = require("../utils/state-details");

const firebaseCredentials = stateDetails.isProduction()
    && Object.assign(
        { private_key: String(process.env.FIREBASE_PRIVATE_KEY).replace(/\\n/g, "\n") },
        require("../creds/firebase-admin-prod.json")
    )

if (firebaseAdmin.apps.length > 0) {
    firebaseAdmin.app();
}
else if (process.env.TEST_ENABLED) {
    firebaseAdmin.initializeApp({
        projectId: process.env.FIRESTORE_PROJECT_ID,
        databaseURL: stateDetails.getDbUrl(),
    });
}
else {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseCredentials),
        databaseURL: stateDetails.getDbUrl(),
    });
}

const db = firebaseAdmin.firestore();

module.exports = { db: db };
