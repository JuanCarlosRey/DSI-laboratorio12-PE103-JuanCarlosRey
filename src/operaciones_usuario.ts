import { User } from "./usuario";
import { Funko } from "./funko";
import chalk from "chalk";
const log = console.log;

/**
 * Clase que extiende a la clase usuario e incorpora operaciones sobre la colección
 * de funkos.
 */
export class OperableUser extends User {
    constructor(protected _id: number, protected _name: string, protected _funkoCollection: Funko[]) {
        super(_id, _name, _funkoCollection);
    }

    /**
     * Añade un funko a la colección de funkos del usuario.
     * @param newFunko Nuevo funko a añadir.
     * @returns 0 si la operación ha salido correctamente o -1 si hubo algun error.
     */
    addFunko(newFunko: Funko): number {
        if(this._funkoCollection.find(funko => funko.id == newFunko.id) == undefined) {
            this.funkoCollection.push(newFunko);
            log(chalk.green("Funko añadido correctamente!"));
            return 0;
        } else {
            log(chalk.red("ERROR: Ya existe un funko con esa ID."));
            return -1;
        }
    }

    /**
     * Modifica un funko de la lista de funkos del usuario.
     * @param newFunko Nuevo funko a añadir. Debe tener un ID que tambien lo tenga algun funko de la colección.
     * @returns 0 si la operación ha salido correctamente o -1 si hubo algun error.
     */
    modifyFunko(newFunko: Funko): number {
        const position = this._funkoCollection.findIndex(funko => funko.id == newFunko.id);
        if(position != -1) {
            this.funkoCollection[position] = newFunko;
            log(chalk.green("Funko modificado correctamente!"));
            return 0;
        } else {
            log(chalk.red("ERROR: No existe un funko con esa ID."));
            return -1;
        }
    }

    /**
     * Elimina un funko de la lista de funkos del usuario.
     * @param idFunko Id del funko a eliminar.
     * @returns 0 si la operación ha salido correctamente y -1 si hubo algun error.
     */
    deleteFunko(idFunko: number): number {
        const position = this._funkoCollection.findIndex(funko => funko.id == idFunko);
        if(position != -1) {
            this.funkoCollection.splice(position, 1);
            log(chalk.green("Funko eliminado correctamente!"));
            return 0;
        } else {
            log(chalk.red("ERROR: No existe un funko con esa ID."));
            return -1;
        }
    }

    /**
     * Muestra la lista de funkos del usuario, junto a la infomración detallada de cada uno.
     */
    listFunko(): number {
        this._funkoCollection.forEach((funko) => {
            console.log("----------------------------------")
            console.log(`ID: ${funko.id}`);
            console.log(`Nombre: ${funko.name}`);
            console.log(`Descripcion:  + ${funko.description}`);
            console.log(`Tipo:  + ${funko.type}`);
            console.log(`Género:  + ${funko.gender}`);
            console.log(`Franquicia:  + ${funko.franchise}`);
            console.log(`Número:  + ${funko.number}`);
            console.log(`Exlusivo:  + ${funko.exclusive}`);
            console.log(`Características:  + ${funko.specialCharacteristics}`);
            if(funko.value < 20) {
                log("Valor: " + chalk.red(`${funko.value}`))
            } else if (funko.value < 50) {
                log("Valor: " + chalk.magenta(`${funko.value}`))
            } else if (funko.value < 200) {
                log("Valor: " + chalk.yellow(`${funko.value}`))
            } else {
                log("Valor: " + chalk.green(`${funko.value}`))
            }
        });
        return 0;
    }

    /**
     * Muestra la información detallada de un funko de la colección.
     * @param idFunko Id del funko del que se quiere mostrar la información.
     * @returns 0 si la operación ha salido correctamente y -1 si hubo algun error.
     */
    showFunkoInfo(idFunko: number): number {
        const index = this.funkoCollection.findIndex(funko => funko.id == idFunko);
        if(index != -1) {
            console.log(`ID: ${this.funkoCollection[index].id}`);
            console.log(`Nombre: ${this.funkoCollection[index].name}`);
            console.log(`Descripcion:  + ${this.funkoCollection[index].description}`);
            console.log(`Tipo:  + ${this.funkoCollection[index].type}`);
            console.log(`Género:  + ${this.funkoCollection[index].gender}`);
            console.log(`Franquicia:  + ${this.funkoCollection[index].franchise}`);
            console.log(`Número:  + ${this.funkoCollection[index].number}`);
            console.log(`Exlusivo:  + ${this.funkoCollection[index].exclusive}`);
            console.log(`Características:  + ${this.funkoCollection[index].specialCharacteristics}`);
            if(this.funkoCollection[index].value < 20) {
                log("Valor: " + chalk.red(`${this.funkoCollection[index].value}`))
            } else if (this.funkoCollection[index].value < 50) {
                log("Valor: " + chalk.magenta(`${this.funkoCollection[index].value}`))
            } else if (this.funkoCollection[index].value < 200) {
                log("Valor: " + chalk.yellow(`${this.funkoCollection[index].value}`))
            } else {
                log("Valor: " + chalk.green(`${this.funkoCollection[index].value}`))
            }
            return 0;
        } else {
            log(chalk.red("ERROR: No existe un funko con esa ID."));
            return -1;
        }
    }
}