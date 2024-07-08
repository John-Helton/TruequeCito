# TruequeCito

TruequeCito es una plataforma de intercambio que permite a los usuarios intercambiar productos de manera eficiente y segura. Este proyecto está dividido en dos partes principales: el backend y el frontend.

## Estructura del Proyecto

El proyecto se organiza en dos carpetas principales:

- `backend/`: Contiene el código fuente del servidor, incluyendo controladores, modelos y rutas para la API REST.
- `Frontend/`: Contiene el código fuente de la interfaz de usuario, desarrollada con Angular.

## Requisitos Previos

Para ejecutar este proyecto, necesitarás tener instalado Node.js y npm en tu sistema. Angular CLI es necesario para el desarrollo del frontend.

## Configuración del Proyecto

### Backend

1. Navega a la carpeta `backend/`.
2. Instala las dependencias con `npm install`.
3. Crea un archivo `.env` en la raíz de la carpeta `backend/` con las variables de entorno necesarias.
4. Ejecuta el servidor con `npm start`.

### Frontend

1. Navega a la carpeta `Frontend/`.
2. Instala las dependencias con `npm install`.
3. Ejecuta el servidor de desarrollo con `npm start` o `ng serve`.
4. Navega a `http://localhost:4200/` para ver la aplicación.

## Despliegue

### Backend

Para desplegar el backend, asegúrate de tener configuradas las variables de entorno adecuadas para tu entorno de producción.

### Frontend

Para desplegar el frontend, ejecuta `ng build` para generar los artefactos de construcción, los cuales estarán en la carpeta `dist/`.

## Pruebas

### Backend

Las pruebas para el backend pueden ser ejecutadas con comandos específicos definidos en `package.json`.

### Frontend

Para ejecutar las pruebas unitarias, utiliza `ng test`. Para pruebas end-to-end, utiliza `ng e2e`.

## Contribuir

Si estás interesado en contribuir a este proyecto, por favor lee las guías de contribución y envía tus pull requests a la rama correspondiente.

