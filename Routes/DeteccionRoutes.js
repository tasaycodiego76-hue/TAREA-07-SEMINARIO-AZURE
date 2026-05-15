const express = require('express')
const router = express.Router()

const deteccionController = require('../Controllers/DeteccionController')

router.post('/analizar', deteccionController.detectarObjetos)

module.exports = router