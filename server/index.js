require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { OrderRouter } = require('./entities')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '/../client/build')))

const PORT = process.env.PORT || 4000

// Routes
app.use('/api/orders', OrderRouter)

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`)
})
