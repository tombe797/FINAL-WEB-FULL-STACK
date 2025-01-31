import mysql.connector

db_config = {
    "host": "localhost",
    "user": "root",
    "password": "TombeCarolina797**",
    "database": "base_de_datos_pagina"
}

try:
    conn = mysql.connector.connect(**db_config)
    print("Conexión exitosa")
    conn.close()
except mysql.connector.Error as e:
    print(f"Error: {e}")
