'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://overflow-1c880.firebaseio.com/'
})

const db = firebase.app().database()

const Users = require('./users')
const Questions = require('./questions')

module.exports = {
    Users: new Users(db),
    Questions: new Questions(db)
}