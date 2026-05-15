exports.detectarObjetos = async (req, res) => {
    try {
        const { imageUrl } = req.body

        if (!imageUrl) {
            return res.status(400).json({ error: 'Debes enviar imageUrl en el body' })
        }

        const URL_DETECCION = `${process.env.AZURE_CV_ENDPOINT}/vision/v3.2/analyze?visualFeatures=Objects`

        // Enviar imagen a Azure
        const response = await fetch(URL_DETECCION, {
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

        // Azure devuelve el resultado inmediatamente (no necesita polling)
        const data = await response.json()

        // Formatear los objetos detectados
        const objetosDetectados = data.objects.map(obj => ({
            objeto: obj.object,
            confianza: `${(obj.confidence * 100).toFixed(2)}%`,
            ubicacion: {
                x: obj.rectangle.x,
                y: obj.rectangle.y,
                ancho: obj.rectangle.w,
                alto: obj.rectangle.h
            }
        }))

        res.json({
            imagenUrl: imageUrl,
            objetosDetectados,
            totalObjetos: objetosDetectados.length
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}