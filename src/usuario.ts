import { Funko } from "./funko";

/**
 * Clase que representa a un usuario que tiene una colección de funko pops.
 */
export class User {
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

    addFunko(newFunko: Funko) {
        if(this._funkoCollection.find(funko => funko.id == newFunko.id) == undefined) {
            this.funkoCollection.push(newFunko);
            //Emitir mensaje bien
        } else {
            //Emitir mensaje error
        }
    }

    modifyFunko(newFunko: Funko) {
        const position = this._funkoCollection.findIndex(funko => funko.id == newFunko.id);
        if(position != -1) {
            this.funkoCollection[position] = newFunko;
            //Emitir mensaje bien
        } else {
            //Emitir mensaje error
        }
    }

    deleteFunko(idFunko: number) {
        const position = this._funkoCollection.findIndex(funko => funko.id == idFunko);
        if(position != -1) {
            this.funkoCollection.splice(position, 1);
            //Emitir mensaje bien
        } else {
            //Emitir mensaje error
        }
    }

    listFunko() {
        // La cosa con el modulo ese
    }

    showFunkoInfo(idFunko: number) {
        // La cosa con el modulo ese
    }
}