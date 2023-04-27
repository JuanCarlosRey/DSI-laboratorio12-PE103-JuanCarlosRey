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
    constructor(protected _id: number, protected _name: string, protected _funkoCollection: Funko[]) {}

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
}