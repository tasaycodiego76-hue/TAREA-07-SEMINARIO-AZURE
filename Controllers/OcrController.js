exports.leerTextoImagen = async (req, res) => {
    try {
        const { imageUrl } = req.body

        if (!imageUrl) {
            return res.status(400).json({ error: 'Debes enviar imageUrl en el body' })
        }

        const URL_OCR = `${process.env.AZURE_CV_ENDPOINT}/vision/v3.2/read/analyze`

        // Enviar imagen a Azure
        const response = await fetch(URL_OCR, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.AZURE_CV_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: imageUrl })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error.message)
        }

        // Azure no devuelve el texto inmediatamente, devuelve la URL en el Header
        const operationLocation = response.headers.get('operation-location')

        // Consultar hasta que el estado sea "succeeded" o "failed"
        let result = null
        while (true) {
            const checkResponse = await fetch(operationLocation, {
                headers: { 'Ocp-Apim-Subscription-Key': process.env.AZURE_CV_KEY }
            })

            result = await checkResponse.json()

            if (result.status === 'succeeded') break
            if (result.status === 'failed') throw new Error('Error procesando imagen')

            await new Promise(resolve => setTimeout(resolve, 1000))
        }

        // Extraer líneas de texto detectadas
        const lineasTexto = []
        result.analyzeResult.readResults.forEach(page => {
            page.lines.forEach(line => {
                lineasTexto.push(line.text)
            })
        })

        res.json({
            imagenUrl: imageUrl,
            textoDetectado: lineasTexto,
            totalLineas: lineasTexto.length
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}