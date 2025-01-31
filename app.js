
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(express.json()); // Para poder leer el cuerpo de las solicitudes
app.use(cors()); // Para permitir solicitudes desde el frontend

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia por tu usuario de MySQL
    password: 'TombeCarolina797**', // Cambia por tu contraseña
    database: 'nbase_de_datos_pagina'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Ruta para manejar los comentarios
app.post('/comentarios', (req, res) => {
    const { nombre, comentario } = req.body;
    
    if (!nombre || !comentario) {
        return res.status(400).json({ error: 'Nombre y comentario son requeridos.' });
    }

    // Guardar el comentario en la base de datos
    const query = 'INSERT INTO comentarios (nombre, comentario) VALUES (?, ?)';
    db.query(query, [nombre, comentario], (err, results) => {
        if (err) {
            console.error('Error al guardar el comentario:', err);
            return res.status(500).json({ error: 'Hubo un error al guardar el comentario.' });
        }
        res.status(200).json({ message: 'Comentario enviado correctamente.' });
    });
});

// Servidor
app.listen(5502, () => {
    console.log('Servidor ejecutándose en http://localhost:5502');
});

    
