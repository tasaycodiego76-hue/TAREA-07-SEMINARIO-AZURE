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

        async function detectarObjetos() {
            const imageUrl = document.getElementById('imageUrl').value.trim()

            document.getElementById('resultado').classList.add('d-none')
            document.getElementById('error').classList.add('d-none')
            document.getElementById('loading').classList.remove('d-none')
            document.getElementById('btnDetectar').disabled = true

            if (!imageUrl) {
                mostrarError('Debes ingresar una URL de imagen.')
                return
            }

            try {
                const response = await fetch('/deteccion/analizar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageUrl })
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error || 'Error en el servidor')
                }

                document.getElementById('totalObjetos').textContent = data.totalObjetos
                const lista = document.getElementById('listaObjetos')
                lista.innerHTML = ''

                data.objetosDetectados.forEach(obj => {
                    const card = document.createElement('div')
                    card.className = 'card mb-2'
                    card.innerHTML = `
                        <div class="card-body py-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <strong>${obj.objeto}</strong>
                                <span class="badge bg-secondary">${obj.confianza}</span>
                            </div>
                            <small class="text-muted">
                                Posición: x=${obj.ubicacion.x}, y=${obj.ubicacion.y} —
                                Tamaño: ${obj.ubicacion.ancho}px × ${obj.ubicacion.alto}px
                            </small>
                        </div>
                    `
                    lista.appendChild(card)
                })

                document.getElementById('resultado').classList.remove('d-none')

            } catch (error) {
                mostrarError(error.message)
            } finally {
                document.getElementById('loading').classList.add('d-none')
                document.getElementById('btnDetectar').disabled = false
            }
        }

        function mostrarError(mensaje) {
            const err = document.getElementById('error')
            err.textContent = mensaje
            err.classList.remove('d-none')
            document.getElementById('loading').classList.add('d-none')
            document.getElementById('btnDetectar').disabled = false
        }