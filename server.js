require('dotenv').config()
const express = require('express')
const app = express()

// Middleware
app.use(express.json())

// Rutas
const ocrRoutes = require('./Routes/OcrRoutes')
const deteccionRoutes = require('./Routes/DeteccionRoutes')

app.use('/ocr', ocrRoutes)
app.use('/deteccion', deteccionRoutes)

// Servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})