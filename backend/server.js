const express = require('express');
const app = express();
require('dotenv').config()
const connect = require('./config/connection')
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware')

// MIDDLEWARE
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors())
app.use(morgan("dev"))


// ROUTES
const authRouter = require('./routes/authRoute')
const postRouter = require('./routes/postRoute')
const userRouter = require('./routes/userRoute')

app.get('/api/auth', authRouter)

// you cant access this if youre not authenticated
app.get('/api/posts', postRouter)
app.get('/api/users', userRouter)

// ERROR MIDDLEWARE
app.use(errorHandler)

const port = process.env.PORT

connect().then(() => {
    app.listen(port, () => console.log("Server listening on port: ", port))
}).catch(error => console.log("Error: ", error))
