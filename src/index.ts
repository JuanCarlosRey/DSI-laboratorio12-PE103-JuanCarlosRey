import { Funko } from "./funko";
import { OperableUser } from "./operaciones_usuario";
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from 'fs';
const log = console.log;

// Lista de usuarios del sistema
let userList: OperableUser[];

/**
 * Función que permite cargar los funkos desde los diferentes ficheros JSON almacenados
 * en el directorio del usuario correspondiente.
 */
export function databaseLoad() {
    let id = 0;

    fs.readdirSync("./data").forEach(user => {
        // Obtenemos los datos de los funkos del usuario
        const newUser = new OperableUser(id, user, []);
        fs.readdirSync("./data/" + user).forEach(funko => {
            const funkoFile = fs.readFileSync("./data/" + user + "/" + funko);
            const funkoJson = JSON.parse(funkoFile.toString());
            const newFunko = new Funko(funkoJson._id, funkoJson._name, funkoJson._description, funkoJson._type, 
                funkoJson._gender, funkoJson._franchise, funkoJson._number, funkoJson._exclusive, 
                funkoJson._specialCaracteristics, funkoJson._value);
            newUser.addFunko(newFunko);
        });
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
                user.funkoCollection.forEach(funko => {
                    fs.writeFileSync("./datos/" + folder + "/" + funko.id + ".json", JSON.stringify(funko));
                });
            }
        });
    });
}

