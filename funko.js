"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funko = exports.Types = void 0;
/**
 * Lista de enumerados que indican el tipo de funko.
 */
var Types;
(function (Types) {
    Types["Pop"] = "Pop!";
    Types["PopRides"] = "Pop! Rides";
    Types["Soda"] = "Vynil Soda";
    Types["Gold"] = "Vynil Gold";
})(Types = exports.Types || (exports.Types = {}));
/**
 * Clase que representa a un funko.
 */
class Funko {
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
    constructor(_id, _name, _description, _type, _gender, _franchise, _number, _exclusive, _specialCaracteristics, _value) {
        this._id = _id;
        this._name = _name;
        this._description = _description;
        this._type = _type;
        this._gender = _gender;
        this._franchise = _franchise;
        this._number = _number;
        this._exclusive = _exclusive;
        this._specialCaracteristics = _specialCaracteristics;
        this._value = _value;
    }
    /**
     * Devuelve el id del funko.
     */
    get id() {
        return this._id;
    }
    /**
     * Devuelve el nombre del funko.
     */
    get name() {
        return this._name;
    }
    /**
     * Devuelve la descripción del funko.
     */
    get description() {
        return this._description;
    }
    /**
     * Devuelve el tipo del funko.
     */
    get type() {
        return this._type;
    }
    /**
     * Devuelve la franquicia del funko.
     */
    get franchise() {
        return this._franchise;
    }
    /**
     * Devuelve el numero del funko en la franquicia.
     */
    get number() {
        return this._number;
    }
    /**
     * Devuelve si el funko es exclusivo o no.
     */
    get exclusive() {
        return this._exclusive;
    }
    /**
     * Devuelve las características especiales del funko.
     */
    get specialCharacteristics() {
        return this._specialCaracteristics;
    }
    /**
     * Devuelve el valor del funko.
     */
    get value() {
        return this._value;
    }
}
exports.Funko = Funko;
