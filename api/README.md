# Levantar Servidor Django

```bash
# Paso 1: Dirigirse a la carpeta 'api' del proyecto
cd api

# Paso 2: Instalar el paquete virtualenv
pip install virtualenv

# Paso 3: Crear un entorno virtual para los paquetes de Django
python -m virtualenv venv

# Paso 4: Activar el entorno virtual
.\venv\Scripts\activate
# Nota: Verificarás que estás en el entorno virtual cuando veas (venv) en la consola.

# Paso 5: Instalar los paquetes necesarios
pip install django djangorestframework python-decouple psycopg2-binary request django-cors-headers

# Paso 6: Descargar y configurar el archivo de variables de entorno
# Descarga el archivo de variables de entorno .env y pégalo en la carpeta 'api' del proyecto.

# Paso 7: Ejecutar la aplicación Django
python manage.py runserver
