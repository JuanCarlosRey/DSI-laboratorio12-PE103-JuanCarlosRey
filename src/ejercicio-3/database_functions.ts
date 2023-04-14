import { Funko } from "./funko";
import { OperableUser } from "./operaciones_usuario";
import { userList } from "./server";
import fs from 'fs';

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