/**
 * Lista de enumerados que indican el tipo de funko.
 */
export declare enum Types {
    Pop = "Pop!",
    PopRides = "Pop! Rides",
    Soda = "Vynil Soda",
    Gold = "Vynil Gold"
}
/**
 * Clase que representa a un funko.
 */
export declare class Funko {
    private _id;
    private _name;
    private _description;
    private _type;
    private _gender;
    private _franchise;
    private _number;
    private _exclusive;
    private _specialCaracteristics;
    private _value;
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
    constructor(_id: number, _name: string, _description: string, _type: Types, _gender: string, _franchise: string, _number: number, _exclusive: boolean, _specialCaracteristics: string, _value: number);
    /**
     * Devuelve el id del funko.
     */
    get id(): number;
    /**
     * Devuelve el nombre del funko.
     */
    get name(): string;
    /**
     * Devuelve la descripción del funko.
     */
    get description(): string;
    /**
     * Devuelve el tipo del funko.
     */
    get type(): Types;
    /**
     * Devuelve la franquicia del funko.
     */
    get franchise(): string;
    /**
     * Devuelve el numero del funko en la franquicia.
     */
    get number(): number;
    /**
     * Devuelve si el funko es exclusivo o no.
     */
    get exclusive(): boolean;
    /**
     * Devuelve las características especiales del funko.
     */
    get specialCharacteristics(): string;
    /**
     * Devuelve el valor del funko.
     */
    get value(): number;
}
