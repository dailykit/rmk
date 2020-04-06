require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const {
   RestaurantRouter,
   MenuRouter,
   RecipeRouter,
   UserRouter,
} = require('./entities')

const app = express()

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
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '/../client/build')))

const PORT = process.env.PORT || 4000

// Routes
app.use('/api/restaurants', RestaurantRouter)
app.use('/api/menu', MenuRouter)
app.use('/api/recipe', RecipeRouter)
app.use('/api/users', UserRouter)

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`)
})
