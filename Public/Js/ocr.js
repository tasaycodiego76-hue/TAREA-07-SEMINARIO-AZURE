 function previsualizarImagen(url) {
            const preview = document.getElementById('preview')
            const img = document.getElementById('imgPreview')

            if (url.trim()) {
                img.src = url.trim()
                preview.classList.remove('d-none')
            } else {
                preview.classList.add('d-none')
            }
        }

        async function analizarOCR() {
            const imageUrl = document.getElementById('imageUrl').value.trim()

            // Limpiar estado anterior
            document.getElementById('resultado').classList.add('d-none')
            document.getElementById('error').classList.add('d-none')
            document.getElementById('loading').classList.remove('d-none')
            document.getElementById('btnAnalizar').disabled = true

            if (!imageUrl) {
                mostrarError('Debes ingresar una URL de imagen.')
                return
            }

            try {
                const response = await fetch('/ocr/analizar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl })
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Error en el servidor')
                }

                // Mostrar resultados
                document.getElementById('totalLineas').textContent = data.totalLineas
                const lista = document.getElementById('listaTexto')
                lista.innerHTML = ''
                data.textoDetectado.forEach(linea => {
                    const li = document.createElement('li')
                    li.className = 'list-group-item'
                    li.textContent = linea
                    lista.appendChild(li)
                })

                document.getElementById('resultado').classList.remove('d-none')

            } catch (error) {
                mostrarError(error.message)
            } finally {
                document.getElementById('loading').classList.add('d-none')
                document.getElementById('btnAnalizar').disabled = false
            }
        }

        function mostrarError(mensaje) {
            const err = document.getElementById('error')
            err.textContent = mensaje
            err.classList.remove('d-none')
            document.getElementById('loading').classList.add('d-none')
            document.getElementById('btnAnalizar').disabled = false
        }