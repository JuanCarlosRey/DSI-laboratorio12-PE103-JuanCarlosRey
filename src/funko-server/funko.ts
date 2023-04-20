/**
 * Lista de enumerados que indican el tipo de funko.
 */
export enum Types {
    Pop = "Pop!",
    PopRides = "Pop! Rides",
    Soda = "Vynil Soda",
    Gold = "Vynil Gold"
}

/**
 * Clase que representa a un funko.
 */
export class Funko {
    /**
     * Constructor de clase.
     * @param _id Id único del funko.
     * @param _name Nombre del funko.
     * @param _description Descripción del funko.
     * @param _type Tipo del funko.
     * @param _franchise Franquicia del funko.
     * @param _number Número del funko en la franquicia.
     * @param _exclusive Indica si el funko es exclusivo o no.
     * @param _specialCaracteristics Características especiales del funko.
     * @param _value Valor del funko.
     */
    constructor(private _id: number, private _name: string, private _description: string, private _type: Types, 
        private _gender: string, private _franchise: string, private _number: number, private _exclusive: boolean, 
        private _specialCaracteristics: string, private _value: number) {}

    /**
     * Devuelve el id del funko.
     */
    get id(): number {
        return this._id;
    }

    /**
     * Devuelve el nombre del funko.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Devuelve la descripción del funko.
     */
    get description(): string {
        return this._description;
    }

    /**
     * Devuelve el tipo del funko.
     */
    get type(): Types {
        return this._type;
    }

    /**
     * Devuelve el género del funko.
     */
    get gender(): string {
        return this._gender;
    }

    /**
     * Devuelve la franquicia del funko.
     */
    get franchise(): string {
        return this._franchise;
    }

    /**
     * Devuelve el numero del funko en la franquicia.
     */
    get number(): number {
        return this._number;
    }

    /**
     * Devuelve si el funko es exclusivo o no.
     */
    get exclusive(): boolean {
        return this._exclusive;
    }

    /**
     * Devuelve las características especiales del funko.
     */
    get specialCharacteristics(): string {
        return this._specialCaracteristics;
    }

    /**
     * Devuelve el valor del funko.
     */
    get value(): number {
        return this._value;
    }
}