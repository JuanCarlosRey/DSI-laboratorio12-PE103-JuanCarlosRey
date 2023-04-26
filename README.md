# Práctica 11 - Creación de una aplicación Express para gestionar el registro de Funko Pops
#### Realizado por: Juan Carlos Rey Medina (alu0101410869)

[![P12 - Tests](https://github.com/JuanCarlosRey/DSI-laboratorio12-PE103-JuanCarlosRey/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/JuanCarlosRey/DSI-laboratorio12-PE103-JuanCarlosRey/actions/workflows/tests.yml)[![P12 - Coveralls](https://github.com/JuanCarlosRey/DSI-laboratorio12-PE103-JuanCarlosRey/actions/workflows/coveralls.yml/badge.svg?branch=main)](https://github.com/JuanCarlosRey/DSI-laboratorio12-PE103-JuanCarlosRey/actions/workflows/coveralls.yml)[![Coverage Status](https://coveralls.io/repos/github/JuanCarlosRey/DSI-laboratorio12-PE103-JuanCarlosRey/badge.svg?branch=main)](https://coveralls.io/github/JuanCarlosRey/DSI-laboratorio12-PE103-JuanCarlosRey?branch=main)

## Introducción
En esta undécima práctica de la asignatura se nos ha pedido realizar, basándonos en las implementaciones de la aplicación de registro de Funko Pops que se han llevado a cabo en prácticas pasadas, lograr que la funcionalidad de dicha aplicación se implemente a través de un servidor HTTP escrito con Express. Para ello, desde un cliente (en mi caso [ThunderClient](https://www.thunderclient.io/?ref=producthunt)) se podrá llevar a cabo peticiones HTTP al servidor.

## Pasos previos
Antes de realizar los ejercicios solicitado, primero se ha realizado una serie de pasos previos a modo de preparación para la práctica:
- Realizar la [configuración incial del proyecto TypeScript](https://ull-esit-inf-dsi-2223.github.io/typescript-theory/typescript-project-setup.html).
- Instalar [Typedoc](https://typedoc.org) para la generación de documentación.
- Instalar [Mocha](https://mochajs.org) y [Chai](https://www.chaijs.com) para la realización de tests unitarios.
- Instalar [Istanbul](https://istanbul.js.org) y [Coveralls](https://coveralls.io) para el cubrimiento del código.
- Activar las [**GitHub Actions**](https://docs.github.com/en/actions) tanto para las [pruebas](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view?usp=sharing) como para el [cubrimiento](https://drive.google.com/file/d/1yOonmpVbOyvzx3ZbXMQTAPxvA3a7AE7w/view?usp=sharing) y la calidad de códgio ([Sonar Cloud](https://sonarcloud.io/projects)).
- Instalar la [API sincrona de Node.js](https://nodejs.org/docs/latest-v19.x/api/fs.html) para la persistencia de los datos de la app.
- Leer los apuntes de la asignatura sobre [peticiones HTTP y patrones call-back](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/nodejs-http-callback-pattern.html) y sobre [creación de servidores web a través de Express](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/nodejs-express.html).

## Ejercicio
El ejercicio que se nos pide realizar consiste en crear un servidor utilizando *Express* para implementar la funcionalidad de la aplicación de funkos realizada en anteriores prácticas. Desde un cliente como, por ejemplo, ThunderClient o Postman, se tienen que llevar a cabo **peticiones HTTP** al servidor. Las peticiones que podrá realizar el cliente al servidor deberán permitir añadir, modificar, eliminar, listar y mostrar los Funko Pops de un usuario concreto. El servidor Express deberá almacenar la información de los Funko Pops como ficheros JSON en el sistema de ficheros, siguiendo la misma estructura de directorios utilizada durante prácticas pasadas.

Para ello se ha hecho uso de la implementación de las clases ```Funko``` y ```OperableUser``` de prácticas pasadas, además de **Express** para la creación del servidor. La estraregia seguida para el almacenamiento y actualización de la base de datos consistente en ficheros JSON es exáctamente la misma que en la práctica pasada, haciendo uso de las funciones ```databaseLoad()``` y ```databaseSave()``` del fichero ```src/funko-server/database_functions.ts```. 

Para la creación del servidor se ha hecho uso de un objeto ```express()``` apuntado por ```app```:

```ts
const app = express();
```

Y para el procesamiento de las acciones se ha hecho uso de los **verbos HTTP**. La equivalencia entre los verbos y las acciones a realizar son las siguientes:
- ```GET```: equivale a dos acciones, ```list``` y ```show```. Para distinguir que accion se quiere realizar la aplicación se basa en un argumento en concreto, el id de un funko. Si no se pasa un argumento indicando el id del funko se da por hecho que se quiere obtener la lista de funkos del usuario (operación ```list```), y si se pasa el id del funko se mostrará la información de ese funko en concreto (operación ```show```).
- ```POST```: equivale a la acción de añadir un funko a la colección de funkos de un usuario.
- ```DELETE```: equivale a la acción de eliminar un funko de la colección de funkos de un usuario.
- ```PATCH```: equivale a la acción de modificar un funko de la colección de funkos de un usuario.

Para la selección de los argumentos que se deben pasar nos hemos basado completamente en la implementación de la aplicación realizada en prácticas pasadas. Para asegurarnos que se pasan los argumentos correctamente hemos hecho uso de bloques de código como el siguiente:

```ts
if(!req.query.id) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'id is required'}) + '\n');
if(!req.query.name) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'name is required'}) + '\n');
if(!req.query.desc) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'desc is required'}) + '\n');
if(!req.query.type) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'type is required'}) + '\n');
if(!req.query.gender) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'gender is required'}) + '\n');
if(!req.query.franch) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'franch is required'}) + '\n');
if(!req.query.number) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'number is required'}) + '\n');
if(!req.query.excl) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'excl is required'}) + '\n');
if(!req.query.value) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'value is required'}) + '\n');
```

Por cada sentencia ```if``` se comprueba que un argumento obligatorio no esté vacio. En caso de que lo esté se envía un error con código 400 indicando el argumento necesario.

Para el manejo de errores se ha realizado lo siguiente:
- En caso de no introducir una ruta válida (ruta distinta a ```/funkos```), el servidor enviará un mensaje con un código de error *404*.
- Como se ha mencionado anteriormente, para cada acción, si no se envían los argumentos correctamente, el servidor devuelve un mensaje de error con el código *400* indicando el argumento faltante.
- Si se produjo un error al realizar la operación (por ejemplo al tratar eliminar un funko no existente), el servidor devuelve un mensaje de error con el código *500* indicanco explíciatamente el motivo por el que se produjo el fallo.

La estrategia seguida para la implementación de las acciones es exactamente igual que en las prácticas realizadas anteriormente.

## Conclusión
En conclusión, la realización de esta práctica nos ha servido de utilizad para conocer en profundiadad el funcionamiento del módulo **Express** para la creación de servidores web. También nos ha servido para conocer más en detalle el procedimiento que se realiza en las peticiones HTTP.

## Referencias
1. [Peticiones HTTP y patrones callback y callback-chaining | Desarrollo de Sistemas Informáticos - Grado en Ingeniería Informática - ULL](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/nodejs-http-callback-pattern.html)
2. [Servidores Web a través de Express | Desarrollo de Sistemas Informáticos - Grado en Ingeniería Informática - ULL](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/nodejs-express.html)
3. [Express - Node.js web application framework](http://expressjs.com)
4. [Thunder Client - Lightweight Rest API Client Extension for VS Code](https://www.thunderclient.com/?ref=producthunt)
5. [request - npm](https://www.npmjs.com/package/request)
