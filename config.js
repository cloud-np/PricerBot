'use strict';
const dotenv = require('dotenv');
dotenv.config();

const {
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    BOT_TOKEN,
    PREFIX,
    MAIN_SERVER_ID,
    TEST_SERVER_ID
} = process.env;


module.exports = {
    url: HOST_URL,
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID
    },
    botToken: BOT_TOKEN,
    prefix: PREFIX,
    mainServerID: MAIN_SERVER_ID,
    testServerID: TEST_SERVER_ID
}