const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

require("dotenv").config();

// Suppress config warnings in production
if (process.env.NODE_ENV === 'production') {
    process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
}

const db = require('./config/mongoose-connection');
const indexRouter = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const userRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
})
);


app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});