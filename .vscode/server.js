const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar body-parser para JSON
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia esto si tienes un usuario diferente
    password: '',  // Coloca tu contraseña de MySQL aquí si tienes
    database: 'comentarios_db'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});

// Ruta para obtener todos los comentarios
app.get('/comentarios', (req, res) => {
    const query = 'SELECT * FROM comentarios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener comentarios:', err);
            return res.status(500).send('Error al obtener comentarios');
        }
        res.json(results);
    });
});

// Ruta para enviar un nuevo comentario
app.post('/comentarios', (req, res) => {
    const { nombre, comentario } = req.body;
    const query = 'INSERT INTO comentarios (nombre, comentario) VALUES (?, ?)';
    db.query(query, [nombre, comentario], (err, results) => {
        if (err) {
            console.error('Error al guardar comentario:', err);
            return res.status(500).send('Error al guardar comentario');
        }
        res.status(201).send('Comentario guardado');
    });
});

// Ruta para responder a un comentario
app.post('/responder/:id', (req, res) => {
    const id = req.params.id;
    const { respuesta } = req.body;
    const query = 'UPDATE comentarios SET respuesta = ? WHERE id = ?';
    db.query(query, [respuesta, id], (err, results) => {
        if (err) {
            console.error('Error al responder comentario:', err);
            return res.status(500).send('Error al responder comentario');
        }
        res.send('Respuesta guardada');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
