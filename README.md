# Prueba técnica store manager MELI

Autor: Gerardo Chapa Díaz González


## Instalación en local

1. Clona el proyecto en la rama main: 

  ```bash
  git clone https://github.com/jerrypkm/store-manager-meli.git
  ```
2. Instalar las dependencias del proyecto

```bash
  npm install
```
3. Clonar el archivo .env.template y renombrarlo a .env
4. Levantar el proyecto en desarrollo
```bash
  npm run dev
```
5. Para correr los test unitarios utilizar el comando
```bash
  npm run test
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
- ``NextJS 15`` como framework de desarrollo
- ``Typescript`` para tipado estricto
- ``Tanstack Query`` para consumo de servicios
- ``NextUI (HeroUI)`` como librería de componentes de UI
- ``zod y react-hook-form`` para validación de formularios
- ``Tailwindcss`` para manejo de estilos y costumización de componentes
- ``next-themes`` como gestor de temas
- ``vitest y react-testing-library`` para realización de pruebas unitarias
- ``github actions`` para gestionar workflows de despliegues
- ``Vercel`` como entorno de despliegue en la nube

## Notas importantes

La rama ``main`` tiene implementado un guardado temporal de datos en localStorage, hace una consulta inicial y utiliza esa información para simular el uso del administrador de la tienda. Si se requiere resetear al valor inicial es necesario realizar un borrado de los datos de navegación, en específico el elemento ``products`` de LocalStorage

Se agregó una rama adicional llamada ``without-local-storage``. Que es altamente recomendada a implementar si se tiene una API real para ser conectada, y de esa manera no depender de LocalStorage para almancenar información. Si se utliza esta rama con fake API store sí se harán las consultas pero no se verán reflejados ningún tipo de cambios.

