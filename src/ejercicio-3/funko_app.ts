import { Funko, Types } from "./funko";
import { OperableUser } from "./operaciones_usuario";
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from 'fs';
const log = console.log;

// Lista de usuarios del sistema
const userList: OperableUser[] = [];

/**
 * Función que permite cargar los funkos desde los diferentes ficheros JSON almacenados
 * en el directorio del usuario correspondiente.
 */
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

/**
 * Funcion que guarda cada funko registrado en un fichero independiente con formato JSON.
 * Cada fichero se almacena en el directorio del dueño del funko.
 */
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

/**
 * Función principal del programa.
 */
yargs(hideBin(process.argv))
    // Añade un nuevo usuario al sistema
    .command('adduser', 'adds a new user', {
        username: {
            description: 'New user',
            type: 'string',
            demandOption: true
        },
    }, (argv) => {
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
    })

    // Comando para añadir un nuevo funko a la lista del usuario.
    .command('add', 'adds a funko', {
        user: {
            description: 'New funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'New funko ID',
            type: 'number',
            demandOption: true
        },
        name: {
            description: 'New funko name',
            type: 'string',
            demandOption: true
        },
        desc: {
            description: 'New funko description',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'New funko type',
            type: 'string',
            demandOption: true
        },
        gender: {
            description: 'New funko gender',
            type: 'string',
            demandOption: true
        },
        franchise: {
            description: 'New funko franchise',
            type: 'string',
            demandOption: true
        },
        number: {
            description: 'New funko number',
            type: 'number',
            demandOption: true
        },
        exclusive: {
            description: 'New funko exclusivity',
            type: 'boolean',
            demandOption: true
        },
        caract: {
            description: 'New funko special caracteristics',
            type: 'string',
            demandOption: false
        },
        value: {
            description: 'New funko value',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
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
    })
    
    // Comando para modificar un funko ya existente en la lista del usuario.
    .command('edit', 'edits a funko', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'Funko ID',
            type: 'number',
            demandOption: true
        },
        name: {
            description: 'Funko name',
            type: 'string',
            demandOption: true
        },
        desc: {
            description: 'Funko description',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'Funko type',
            type: 'string',
            demandOption: true
        },
        gender: {
            description: 'Funko gender',
            type: 'string',
            demandOption: true
        },
        franchise: {
            description: 'Funko franchise',
            type: 'string',
            demandOption: true
        },
        number: {
            description: 'Funko number',
            type: 'number',
            demandOption: true
        },
        exclusive: {
            description: 'Funko exclusivity',
            type: 'boolean',
            demandOption: true
        },
        caract: {
            description: 'Funko special caracteristics',
            type: 'string',
            demandOption: false
        },
        value: {
            description: 'Funko value',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
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
    })

    // Comando para elimiar un funko ya existente en la lista del usuario.
    .command('delete', 'delete a funko', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'Funko ID',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
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
    })

    // Comando para listar los funkos de un usuario.
    .command('list', 'list all existing funkos on a list', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
    }, (argv) => {
        databaseLoad();
        if(userList.find(user => user.name == argv.user) != undefined) {
            userList.find(user => user.name == argv.user)?.listFunko();
        } else {
            log(chalk.red("ERROR: Usuario no encontrado..."));
        }
    })

    // Comando para listar la información de un funko en concreto.
    .command('show', 'show a detailed info of a funko', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'Funko ID',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
        databaseLoad();
        if(userList.find(user => user.name == argv.user) != undefined) {
            if(userList.find(user => user.name == argv.user)?.showFunkoInfo(argv.id) == -1) {
                log(chalk.red("ERROR: No existe un funko con esa ID."));
            }
        } else {
            log(chalk.red("ERROR: Usuario no encontrado..."));
        }
    })
    .help()
    .argv;