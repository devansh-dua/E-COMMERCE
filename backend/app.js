require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/users.routes');
const adminRoutes = require('./routes/admin.routes');

const { default: mongoose } = require('mongoose');
const isLoggedInAsAdmin = require('./middlewares/isLoggedInAsAdmin');
const { verifyTokenAndAuthenticateUser } = require('./auth/jwt');


const appRoutes = require('./routes/app.routes');

app.use('/users', userRoutes);
app.use('/app', verifyTokenAndAuthenticateUser, appRoutes);
app.use('/admin', isLoggedInAsAdmin, adminRoutes);

mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    }).catch(err => {
        console.log(err);
    })