const express = require('express')

// This is for mongodb. Just future plan
// require('./db.js')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const router = require('./router')
const { initEvents, updateEvents } = require('./constructor/index.js')

const app = express()

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { status: 429, message: 'Too many requests.' },
})

app.use(express.json())
app.use(cors())

// Apply the rate limiting middleware to api requests
app.use('/api', limiter)

app.use('/api', router)

initEvents()

setInterval(() => {
  updateEvents()
}, 2000)

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`)
})
