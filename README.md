[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-8d59dc4de5201274e310e4c54b9627a8934c3b88527886e3b421487c677d23eb.svg)](https://classroom.github.com/a/fmDo8ROl)
# Práctica 9 - Aplicación de registro de Funko Pops
#### Realizado por: Juan Carlos Rey Medina (alu0101410869)

[![P9 - Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey/actions/workflows/tests.yml)[![P9 - Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey/actions/workflows/coveralls.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey/actions/workflows/coveralls.yml)[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey?branch=main)[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2223_ull-esit-inf-dsi-22-23-prct09-funko-app-JuanCarlosRey)

## Introducción
En esta novena práctica de la asignatura se nos ha pedido realizar una implementación de una aplicación que permita almacenar información de los Funko Pops pertenecientes a la colección de un usuario. En concreto, se pide crear un sistema que permita añadir, modificar, eliminar, listar y leer la información asociada a un Funko.

## Pasos previos
Antes de realizar el ejercicio solicitado, primero se ha realizado una serie de pasos previos a modo de preparación para la práctica:
- Realizar la [configuración incial del proyecto TypeScript](https://ull-esit-inf-dsi-2223.github.io/typescript-theory/typescript-project-setup.html).
- Instalar [Typedoc](https://typedoc.org) para la generación de documentación.
- Instalar [Mocha](https://mochajs.org) y [Chai](https://www.chaijs.com) para la realización de tests unitarios.
- Instalar [Istanbul](https://istanbul.js.org) y [Coveralls](https://coveralls.io) para el cubrimiento del código.
- Activar las [**GitHub Actions**](https://docs.github.com/en/actions) tanto para las [pruebas](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view?usp=sharing) como para el [cubrimiento](https://drive.google.com/file/d/1yOonmpVbOyvzx3ZbXMQTAPxvA3a7AE7w/view?usp=sharing) y la calidad de códgio ([Sonar Cloud](https://sonarcloud.io/projects)).
- Instalar los paquetes [Chalk](https://www.npmjs.com/package/chalk) para imprimir en color, [Yargs](https://www.npmjs.com/package/yargs) para ejecutar la app mediante comandos y parámetros, y la [API sincrona de Node.js](https://nodejs.org/docs/latest-v19.x/api/fs.html) para la persistencia de los datos de la app.

## Ejercicios
A continuación se describirán las soluciones realizadas para resolver el problema planteado y su justificación:

### Diseño de clases e interfaces
En cuanto al diseño de clases e interfaces, se ha optado por diseñar las tres siguientes clases:
- Clase ```Funko``` que representa a un Funko pop. El propósito de esta clase es el de almacenar toda la información representativa de un funko. Evidentemente, para cada uno de los atributos se ha diseñado un getter. Para el parámetro del tipo se ha optado por realizar un enumerado ```Types``` con el propósito de facilitar la tarea de obtener y registrar datos más adelante.:

```ts
export enum Types {
    Pop = "Pop!",
    PopRides = "Pop! Rides",
    Soda = "Vynil Soda",
    Gold = "Vynil Gold"
}
```
- Clase ```User``` que representa a un usuario del sistema. El propósito de esta clase es el de almacenar toda la información representativa de un usuario, incluyendo su colección de funkos. Para esta clase se ha decidido no implementar las operaciones que trabajen con la colección, ya que así la complejidad de esta es mucho menor y además, se logra respetar el principio de ```Singe Responsibility``` de SOLID. Por ende, solo se han implementado los getters de los atributos.

- Clase ```OperableUser``` que extiende a la clase ```User``` anteriormente mencionada y cuyo propósito es de proporcionar al usuario las funcionalidades necesarias para realizar operaciones sobre su colección de funkos. Para ello se han definido los métodos ```addFunko()```, ```removeFunko()```, ```modifyFunko()```, ```listFunko()``` y ```showFunkoInfo()```, siendo que en los dos últimos se ha utilizado el paquete ```chalk``` para imprimir el valor de los funkos con un color dependiendo del rango ubicado:
```ts
if(this.funkoCollection[index].value < 20) {
    log("Valor: " + chalk.red(`${this.funkoCollection[index].value}`))
} else if (this.funkoCollection[index].value < 50) {
    log("Valor: " + chalk.magenta(`${this.funkoCollection[index].value}`))
} else if (this.funkoCollection[index].value < 200) {
    log("Valor: " + chalk.yellow(`${this.funkoCollection[index].value}`))
} else {
    log("Valor: " + chalk.green(`${this.funkoCollection[index].value}`))
}
```

Una de las cuestiones que se ha tenido a la hora de realizar el diseño de clases es el de hacer la clase ```User``` como **clase abstracta**, definiendo los métodos que realizan acciones sobre la colección como **métodos abstractos** y siendo implementados en la clase ```OperableUser```, sin embargo, como solo se hereda a una única clase hija, no nos ha parecido necesario realizar dicho diseño.

### Programa *main*
Para realizar la aplicación se ha creado el fichero ```funko_app.ts```, que utiliza tanto la **API síncrona de Node.js** como el paquete **yargs**.

Para el almacenamiento de la información se creó la carpeta ```./data``` en donde, cada directorio dentro de esta, corresponde a la lista de funkos del usuario con el mismo nombre que el directorio. Dentro de cada carpeta, la información de los funkos se guarda en un fichero .json independiente para cada funko, siendo el nombre de cada fichero nombrados el id correspondiente del funko:

```
data/
├── gonzalo
│   ├── 1.json
│   └── 2.json
└── juancarlos
    ├── 0.json
    ├── 1.json
    └── 2.json
```

En primer lugar se ha creado las dos siguientes funciones, ambas utilizando la API:
- Función ```databaseLoad()``` que se encarga de cargar toda la información de la base de datos en el sistema. Para ello se abre el directorio ```./data```, donde se almacena toda la lista de usuarios y sus funkos. Después, para cada carpeta correspondiente a un usuario se leen todos los ficheros .json, leyendo la información de cada uno de los atributos de los funkos y almacenándola en un nuevo objeto de tipo ```Funko```. Posteriormente se añade el funko a la colección del usuario y se repite hasta leer todos los funkos del directorio:

```ts
export function databaseLoad() {
    let id = 0;

    fs.readdirSync("./data").forEach(user => {
        // Guardamos la información base del usuario y asignamos una nueva id
        const newUser = new OperableUser(id, user, []);

        // Obtenemos los datos de los funkos del usuario
        fs.readdirSync("./data/" + user).forEach(funko => {
            const funkoFile = fs.readFileSync("./data/" + user + "/" + funko);
            const funkoJson = JSON.parse(funkoFile.toString());
            const newFunko = new Funko(funkoJson._id, funkoJson._name, funkoJson._description, funkoJson._type, 
                funkoJson._gender, funkoJson._franchise, funkoJson._number, funkoJson._exclusive, 
                funkoJson._specialCaracteristics, funkoJson._value);
            newUser.addFunko(newFunko);
        });

        // Registramos al usuario en la lista de usuarios
        userList.push(newUser);
        id++;
    });
}
```

- Función ```databaseSave()``` para almacenar toda la información del sistema en la base de datos y sobreescribirla. Para ello se abre el directorio ```./data```, y para cada usuario se comprueba primero si el fichero .json representativo de un funko sigue perteneciendo a la colección o no (es decir, se comprueba si el funko ha sido eliminado). En caso negativo se elimina el archivo usando ```fs.rmSync()```. Posteriormente se crean nuevos ficheros correspondientes a los nuevos funkos añadidos, o se actualizan los ficheros en caso de que los funkos hayan sufrido modificaciones. Para ello se usa ```fs.writeFileSync()```. Este procedimiento se repite para cada usuario registrado en el sistema:

```ts
export function databaseSave() {
    userList.forEach(user => {
        fs.readdirSync("./data").forEach(folder => {
            if(folder == user.name) {
                // Si hay un archivo json de un funko que no esta en la lista se elimina el archivo.
                fs.readdirSync("./data/" + user.name).forEach(funko => {
                    const funkoFile = fs.readFileSync("./data/" + user.name + "/" + funko);
                    const funkoJson = JSON.parse(funkoFile.toString());
                    if(user.funkoCollection.find(col_funko => col_funko.id == funkoJson._id) == undefined) {
                        fs.rmSync("./data/" + folder + "/" + funkoJson._id + ".json");
                    }
                })
                // Se crean o actualizan los archivos json de los funkos que estan en la lista.
                user.funkoCollection.forEach(funko => {
                    fs.writeFileSync("./data/" + folder + "/" + funko.id + ".json", JSON.stringify(funko));
                });
            }
        });
    });
}
```

Por último se ha usado el paquete **yargs** para definir comandos que permitirán a un usuario realizar operaciones en el sistema. Los comandos implementados para esta práctica son los siguientes:
- ```adduser```: permite registrar un nuevo usuario al sistema. Se pide el nombre del usuario y se comprueba que el nombre no ha sido utilizado con anterioridad. En caso negarivo se crea el directorio correspondiente utilizando ```mkdirSync()```:

```ts
    databaseLoad();
    if(userList.find(user => user.name == argv.username) == undefined) {
        const newUser = new OperableUser(0, argv.username, []);
        userList.push(newUser);
        fs.mkdirSync("./data/" + argv.username);
        log(chalk.green("Usuario creado correctamente."));
    } else {
        log(chalk.red("ERROR: Ya existe un usuario con ese nombre."));
    }
    databaseSave();
```

- ```add```: permite añadir un nuevo funko a la colección de un usuario. Se piden todos los atributos representativos del funko (a excepción de las características especiales que es opcional) además del nombre del usuario. Se comprueba si el usuario existe y se llama al método ```addFunko()``` de ```OperableUser```. Por último se actualiza la base de datos:

```ts
    databaseLoad();
    const type = argv.type as Types;
    let newFunko: Funko;
    if(argv.caract != undefined) {
        newFunko = new Funko(argv.id, argv.name, argv.desc, type, argv.gender, argv.franchise, argv.number, 
            argv.exclusive, argv.caract, argv.value);
    } else {
        newFunko = new Funko(argv.id, argv.name, argv.desc, type, argv.gender, argv.franchise, argv.number, 
            argv.exclusive, "", argv.value);
    }
    if(userList.find(user => user.name == argv.user) != undefined) {
        if(userList.find(user => user.name == argv.user)?.addFunko(newFunko) == 0) {
            log(chalk.green("Funko añadido correctamente!"));
        } else {
            log(chalk.red("ERROR: Ya existe un funko con esa ID."));
        }
    } else {
        log(chalk.red("ERROR: Usuario no encontrado..."));
    }
    databaseSave();
```

- ```edit```: permite editar un funko existente de la colección de un usuario. Se piden todos los atributos representativos del funko (a excepción de las características especiales que es opcional) además del nombre del usuario. Se comprueba si el usuario y el funko existen y se llama al método ```modifyFunko()```. Por último se actualiza la base de datos:

```ts
    databaseLoad();
    const type = argv.type as Types;
    let newFunko: Funko;
    if(argv.caract != undefined) {
        newFunko = new Funko(argv.id, argv.name, argv.desc, type, argv.gender, argv.franchise, argv.number, 
            argv.exclusive, argv.caract, argv.value);
    } else {
        newFunko = new Funko(argv.id, argv.name, argv.desc, type, argv.gender, argv.franchise, argv.number, 
            argv.exclusive, "", argv.value);
    }
    if(userList.find(user => user.name == argv.user) != undefined) {
        if(userList.find(user => user.name == argv.user)?.modifyFunko(newFunko) == 0) {
            log(chalk.green("Funko modificado correctamente!"));
        } else {
            log(chalk.red("ERROR: No existe un funko con esa ID."));
        }
    } else {
        log(chalk.red("ERROR: Usuario no encontrado..."));
    }
    databaseSave();
```
- ```remove```: permite eliminar un funko de la colección de un usuario. Se pide el id del funko a eliminar y el nombre del usuario. Se comprueba si el usuario existe y se llama al método ```removeFunko()```. Por último se actualiza la base de datos:

```ts
    databaseLoad();
    if(userList.find(user => user.name == argv.user) != undefined) {
        if(userList.find(user => user.name == argv.user)?.deleteFunko(argv.id) == 0) {
            log(chalk.green("Funko eliminado correctamente!"));
        } else {
            log(chalk.red("ERROR: No existe un funko con esa ID."));
        }
    } else {
        log(chalk.red("ERROR: Usuario no encontrado..."));
    }
    databaseSave();
```

- ```list```: permite listar todos los funkos de una colección de un usuario y mostrar toda la información correspondiente. Se pide el nombre del usuario y se comprueba si existe dentro del sistema. En caso positivo se llama al método ```listFunko()```:

```ts
    databaseLoad();
    if(userList.find(user => user.name == argv.user) != undefined) {
        userList.find(user => user.name == argv.user)?.listFunko();
    } else {
        log(chalk.red("ERROR: Usuario no encontrado..."));
    }
```

- ```show```: permite mostrar la información de un funko de un usuario concreto. Se pide el nombre del usuario y el id del funko. Al igual que en el anterior caso, se comprueba que el usuario exista en el sistema y que el funko también exista. En caso positivo se llama al método ```showFunkoInfo()```:

```ts
    databaseLoad();
    if(userList.find(user => user.name == argv.user) != undefined) {
        if(userList.find(user => user.name == argv.user)?.showFunkoInfo(argv.id) == -1) {
            log(chalk.red("ERROR: No existe un funko con esa ID."));
        }
    } else {
        log(chalk.red("ERROR: Usuario no encontrado..."));
    }
```

La forma de ejecutar el código y comprobar su funcionamiento es utilizando el siguiente comando:
```
node dist/funko_app.js <comando> <parámetros ...>
```

## Conclusión
En conclusión, la práctica que hemos llevado a cabo ha sido beneficiosa por varias razones. En primer lugar, nos ha permitido aprender y familiarizarnos con dos paquetes muy populares de Node.js como lo son **yargs**, para crear interfaces de línea de comandos (CLI) de manera sencilla y eficiente  y **chalk** para dar color y estilo a los mensajes que imprimimos por consola, mejorando así la la legibilidad y el diseño de nuestras aplicaciones.

Además, esta práctica nos ha permitido profundizar en el funcionamiento de la **API síncrona de Node.js**. Aunque la tendencia actual es trabajar con código asíncrono en Node.js, conocer el funcionamiento de la API síncrona puede ser muy útil para casos en los que necesitamos realizar operaciones simples y no queremos hacer uso de callbacks, promesas o async/await.

## Referencias
1. [yargs - npm](https://www.npmjs.com/package/yargs)
2. [chalk - npm](https://www.npmjs.com/package/chalk)
3. [File system | Node.js v19.8.1 Documentation](https://nodejs.org/docs/latest-v19.x/api/fs.html)