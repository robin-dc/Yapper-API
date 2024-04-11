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

app.get('/', (req, res) => res.status(200).json("Okay"))

app.use('/api/auth', authRouter)

// you cant access this if youre not authenticated
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

// ERROR MIDDLEWARE
app.use(errorHandler)

const port = process.env.PORT || 3001

connect().then(() => {
    app.listen(port, () => console.log("Server listening on port: ", port))
}).catch(error => console.log("Error: ", error))
