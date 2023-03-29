import { Funko } from "./funko";
import chalk from "chalk";

/**
 * Clase que representa a un usuario que tiene una colección de funko pops.
 */
export class User {
    private log = console.log

    /**
     * Constructor de clase.
     * @param _id Id del usuario.
     * @param _name Nombre del usuario.
     * @param _funkoCollection Colección de funkos del usuario.
     */
    constructor(private _id: number, private _name: string, private _funkoCollection: Funko[]) {}

    /**
     * Devuelve el id del usuario.
     */
    get id(): number {
        return this._id;
    }

    /**
     * Devuelve el nombre del usuario.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Devuelve la colección de funkos del usuario.
     */
    get funkoCollection(): Funko[] {
        return this._funkoCollection;
    }

    addFunko(newFunko: Funko): number {
        if(this._funkoCollection.find(funko => funko.id == newFunko.id) == undefined) {
            this.funkoCollection.push(newFunko);
            this.log(chalk.green("Funko añadido correctamente!"));
            return 0;
        } else {
            this.log(chalk.red("ERROR: Ya existe un funko con esa ID."));
            return -1;
        }
    }

    modifyFunko(newFunko: Funko): number {
        const position = this._funkoCollection.findIndex(funko => funko.id == newFunko.id);
        if(position != -1) {
            this.funkoCollection[position] = newFunko;
            this.log(chalk.green("Funko modificado correctamente!"));
            return 0;
        } else {
            this.log(chalk.red("ERROR: No existe un funko con esa ID."));
            return -1;
        }
    }

    deleteFunko(idFunko: number): number {
        const position = this._funkoCollection.findIndex(funko => funko.id == idFunko);
        if(position != -1) {
            this.funkoCollection.splice(position, 1);
            this.log(chalk.green("Funko eliminado correctamente!"));
            return 0;
        } else {
            this.log(chalk.red("ERROR: No existe un funko con esa ID."));
            return -1;
        }
    }

    listFunko() {
        this._funkoCollection.forEach((funko) => {
            console.log("----------------------------------")
            console.log("ID: " + funko.id);
            console.log("Nombre: " + funko.name);
            console.log("Descripcion: " + funko.description);
            console.log("Tipo: " + funko.type);
            console.log("Género: " + funko.gender);
            console.log("Franquicia: " + funko.franchise);
            console.log("Número: " + funko.number);
            console.log("Exlusivo: " + funko.exclusive);
            console.log("Características: " + funko.specialCharacteristics);
            // Rangos de mercado
        });
    }

    showFunkoInfo(idFunko: number) {
        // La cosa con el modulo ese
    }
}