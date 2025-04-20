# Prueba técnica store manager MELI

Autor: Gerardo Chapa Díaz González


## Instalación en local

1. Clona el proyecto en la rama main: 

  ```bash
  git clone https://github.com/jerrypkm/store-manager-meli.git
  ```
2. Instalar las dependencias del proyecto

```bash
  npm i
  # or
  yarn
```
3. Clonar el archivo .env.template y renombrarlo a .env
4. Levantar el proyecto en desarrollo
```bash
npm run dev
# or
yarn dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para ver el proyecto en local.

## Para despliegue a producción

1. Realizar el build del proyecto con el comando
```bash
  npm run build
  # or
  yarn build
```
2. Con el build generado correr el comando en el servidor
```bash
  npm run start
```
3. Agregar las variables de entorno listadas en el archivo .env.template


## Tecnologías utilizadas
- ``Tanstack Query`` para consumo de servicios
- ``NextUI (HeroUI)`` como librería de componentes
- ``zod y react-hook-form`` para validación de formularios
- ``Tailwindcss`` para manejo de estilos y costumización de componentes
- ``next-themes`` como gestor de temas
- ``jest y react-testing-library`` para realización de pruebas unitarias
- ``Typescript`` para tipado estricto
- ``NextJS 15`` como framework de desarrollo

## Notas
Se agregó una rama adicional llamada ``without-local-storage``. Que es altamente recomendada a implementar si se tiene una API real para ser conectada, y que no se dependa de localStorage para el almacenamiento de datos temporales.