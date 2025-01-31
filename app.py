
from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="TombeCarolina797**",
        database="base_de_datos_pagina"
    )

# ✔️ Ruta para guardar comentarios (POST)
@app.route('/comentarios', methods=['POST'])
def guardar_comentario():
    data = request.json
    nombre = data.get("nombre")
    comentario = data.get("comentario")

    if not nombre or not comentario:
        print("❌ Error: Faltan datos")
        return jsonify({"error": "Faltan datos"}), 400

    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()
        cursor.execute("INSERT INTO comentarios (nombre, comentario, fecha) VALUES (%s, %s, NOW())", (nombre, comentario))
        conexion.commit()
        cursor.close()
        conexion.close()
        print("✅ Comentario guardado")
        return jsonify({"mensaje": "Comentario guardado"}), 201
    except Exception as e:
        print(f"❌ Error en la base de datos: {str(e)}")
        return jsonify({"error": str(e)}), 500

# ✔️ Ruta para obtener comentarios (GET)
@app.route('/comentarios', methods=['GET'])
def obtener_comentarios():
    try:
        conexion = conectar_bd()
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM comentarios ORDER BY fecha DESC")
        comentarios = cursor.fetchall()
        cursor.close()
        conexion.close()

        # Convertir a JSON
        comentarios_json = [{"id": row[0], "nombre": row[1], "comentario": row[2], "fecha": str(row[3])} for row in comentarios]
        
        return jsonify(comentarios_json)
    except Exception as e:
        print(f"❌ Error al obtener comentarios: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5502)
