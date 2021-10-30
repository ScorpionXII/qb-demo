const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

let app = express();

const clientPromise = mongoose.connect(process.env.MONGO_DB_CONNECTION_PROD)
    .then(instance => instance.connection.getClient());

app.use(session({
    name: 'session_id',
    resave: true,
    saveUninitialized: false,
    secret: 'qb-backend_secret_1234!',
    store: MongoStore.create({ clientPromise: clientPromise }),
}));


app.use(cors({
    origin: true,
    credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');
const mixedContactRouter = require('./routes/mixedContact');

app.use('/api/auth', authRouter);
app.use('/api/main', mainRouter);
app.use('/api/mixedContact', mixedContactRouter);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = app;
