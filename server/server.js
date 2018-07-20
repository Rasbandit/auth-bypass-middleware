require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    , chalk = require('chalk')
    , mid = require('./middleware')
    , ctrl = require('./controller')
    , session = require('express-session')
    , dU = require('./dbUtils');

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env

let app = express();

app.use( express.json() );

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

massive( CONNECTION_STRING )
.then( db => {
    console.log( chalk.magenta('Database Connected') );
    app.set( 'db', db )
    dU.bootstrapDB(db)
})

app.use(mid.bypassAuthInDevelopment)

app.get('/auth/callback', ctrl.authCallback)

app.get('/api/user-data', ctrl.authCheck)

app.get('/api/logout', ctrl.logout)

app.post('/api/favorites', ctrl.addFavorite)

app.get('/cleanupdb', dU.cleanupDB)


app.listen( SERVER_PORT, () => console.log( chalk.cyan.underline(`Hard to port ${SERVER_PORT}`) ))