const path = require('path')
const express = require('express')
const morgan = require('morgan')

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

app.use(express.static(path.join(__dirname, '/../client/build')))

const PORT = process.env.PORT || 4000

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

app.listen(PORT, () => {
   console.log(`Server started on ${PORT}`)
})
