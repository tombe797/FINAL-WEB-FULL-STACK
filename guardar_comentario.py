
from flask import Flask, request, render_template, jsonify
import mysql.connector

app = Flask(__name__)

# Configuración de la base de datos
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "TombeCarolina797**",
    "database": "base_de_datos_pagina"
}

@app.route('/')
def index():
    return render_template('proyecto.html')  # Asegúrate de que este archivo HTML esté en la carpeta 'templates'

@app.route('/guardar_comentario', methods=['POST'])
def guardar_comentario():
    try:
        # Obtener datos del formulario
        nombre = request.form.get('nombre')
        comentario = request.form.get('comentarios')

        if not nombre or not comentario:
            return jsonify({"error": "Faltan datos"}), 400

        # Conectar con MySQL
        conexion = mysql.connector.connect(**db_config)
        cursor = conexion.cursor()

        # Insertar datos en la tabla
        sql = "INSERT INTO comentarios (nombre, comentario) VALUES (%s, %s)"
        valores = (nombre, comentario)
        cursor.execute(sql, valores)
        conexion.commit()

        # Cerrar conexión
        cursor.close()
        conexion.close()

        return jsonify({"mensaje": "Comentario guardado con éxito"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
