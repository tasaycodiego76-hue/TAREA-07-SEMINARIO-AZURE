const express = require('express')
const router = express.Router()

const ocrController = require('../Controllers/OcrController')

router.post('/analizar', ocrController.leerTextoImagen)

module.exports = router