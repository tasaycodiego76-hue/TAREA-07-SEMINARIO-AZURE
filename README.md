# TAREA-07-AZURE

Aplicación web con Node.js y Express que integra dos servicios de **Azure Computer Vision**:
- **OCR**: extrae texto de cualquier imagen mediante URL
- **Detección de objetos**: identifica objetos y su ubicación en una imagen

---

## Procedimientos

### 1. Clonar el repositorio
```
git clone https://github.com/tu-usuario/TAREA-07-AZURE.git
```

### 2. Configurar el archivo .env
Crea un archivo `.env` en la raíz del proyecto y coloca tus credenciales de Azure:
```
AZURE_CV_ENDPOINT=https://tu-recurso.cognitiveservices.azure.com
AZURE_CV_KEY=tu_clave_aqui
PORT=3000
```

### 3. Instalar dependencias
```
npm install
```

### 4. Iniciar el servidor
```
node server.js
```

### 5. Abrir en el navegador
```
http://localhost:3000
```

---

## Uso

1. En la pantalla principal selecciona un servicio
2. Ingresa la URL pública de una imagen
3. La vista previa de la imagen se muestra automáticamente
4. Haz clic en el botón para analizar
5. El resultado se muestra en pantalla

---

## 📁 Estructura del Proyecto
```
TAREA-07-AZURE/
├── Controllers/
│   ├── OCRController.js          → Lógica OCR con Azure Read API
│   └── DeteccionController.js    → Lógica detección de objetos
├── Routes/
│   ├── OcrRoutes.js              → Ruta POST /ocr/analizar
│   └── DeteccionRoutes.js        → Ruta POST /deteccion/analizar
├── public/
│   ├── js/
│   │   ├── ocr.js                → Lógica del formulario OCR
│   │   └── deteccion.js          → Lógica del formulario detección
│   ├── index.html                → Menú principal con dos servicios
│   ├── ocr.html                  → Vista OCR
│   └── deteccion.html            → Vista detección de objetos
├── .env                          → Variables de entorno 
├── .gitignore
├── package.json
└── server.js                     → Servidor Express principal
```

---

## 🛠️ Tecnologías
```
Node.js                    - Entorno de ejecución
Express                    - Framework backend
Azure Computer Vision      - API de inteligencia artificial
Bootstrap 5                - Estilos del frontend
dotenv                     - Manejo de variables de entorno
```