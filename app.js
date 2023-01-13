require('dotenv').config()
const express = require('express')
const cors = require("cors")
const morgan = require('morgan')

const mogodb = require('./mongodb/connection')
const authRoute = require('./routes/authRoute')
const jobRoute = require('./routes/jobRoute')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handle')


const app = express()
mogodb.connect()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
// Allow,Parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//route
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/jobs', jobRoute)

app.get('/api/v1', (req, res) => {
  res.send('Welcome')
})

//middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

module.exports = app
