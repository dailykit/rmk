require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// Local imports

// DB Connection
mongoose
   .connect(process.env.DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Connected to DB...'))
   .catch(e => console.log(e))

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.get('/api/users', (req, res) => {
   res.json({
      success: true,
      message: `Use DailyKEY(${process.env.DAILYKEY_IP}) for this route`,
      data: null,
   })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`)
})
