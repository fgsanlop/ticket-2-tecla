# Ticket 2 "TeclerZone"

__Red social para interactuar con otros teclers (Miembros de Tecla Coding Academy)__

## Instalación 🔧

Crea un archivo .ENV en la raíz del proyecto para configurar los parametros de despliegue...

```
HOST='localhost'
PORT=
WHITELIST=[]
DB_HOST='localhost'
DB_PORT=1433
DB_USER=
DB_PASS=
DB_NAME='tecler_zone'
SECRET_KEY= <clave para creación jwt>
```
_Es necesario crear una base de datos con el nombre 'tecler_zone' en SQL Server con un usuario y una contraseña registrados en el manejador_

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```
npm i
```

## Ejecución

Para correr el proyecto en un entorno de desarrollo ejecuta:

```
npm run dev
```

_La API y las vistas se mostrara en el puerto elegido y escrito en las variables de entorno_

***

__⌨️ por [fgsanlop](https://github.com/fgsanlop)__