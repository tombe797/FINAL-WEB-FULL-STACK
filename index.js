const express = require('express');
const app = express();

const PORT = 3000; // Puedes cambiar el puerto si lo necesitas

// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! El servidor está funcionando.');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
