const express = require('express');
const app = express();
const taskRoutes = require('./api/task/tasks-routes');
const registerNewUserRoutes = require('./api/register/register-routes');
const usersRoutes = require('./api/user/user-routes');
const authRoutes = require('./api/auth/auth-routes');
const setEnvironment = require('./config/env.js');

const connectToDB = require('./config/db');
connectToDB();
setEnvironment(app);


app.use('/task', taskRoutes);
app.use('/user', usersRoutes);
app.use('/register', registerNewUserRoutes);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    if (process.env.NODE_ENV !== "production ") {
        return res.send('Running server in dev');
    } else {
        return res.sendFile('index.html', {root: __dirname + '/../dist'});
    }
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
