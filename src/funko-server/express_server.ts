import { Funko, Types } from "./funko";
import { OperableUser } from "./operaciones_usuario";
import { databaseLoad, databaseSave } from "./database_functions";
import express from 'express';

// Lista de usuarios del sistema
export let userList: OperableUser[] = [];

const app = express();

/**
 * Obtener información de uno o varios funkos de la lista de funkos de un usuario.
 */
app.get('/funkos', (req, res) => {
    if(!req.query.user) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'user is required'}) + '\n');

    databaseLoad();
    const searchedUser = userList.find((user) => user.name == req.query.user);
    if(searchedUser) {
        if(!req.query.funko) { // Función list
            const funkoCollection: Funko[] = [];
            searchedUser.funkoCollection.forEach((funko) => {
                funkoCollection.push(funko);
            });
            res.send(JSON.stringify({'type': 'success', 'output': funkoCollection}) + '\n');
        } else { // Función show
            const searchedFunko = searchedUser.funkoCollection.find((funko) => funko.id == Number(req.query.funko));
            if(searchedFunko) {
                res.send(JSON.stringify({'type': 'success', 'output': searchedFunko}) + '\n');
            } else {
                res.status(500).send(JSON.stringify({'type': 'error', 'output': 'funko not found'}) + '\n');
            }
        }  
    } else {
        res.status(500).send(JSON.stringify({'type': 'error', 'output': 'user not found'}) + '\n');
    }
    userList = [];
});

/**
 * Añadir un funko a la lista de un usuario.
 */
app.post('/funkos', (req, res) => {
    if(!req.query.user) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'user is required'}) + '\n');
    if(!req.query.id) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'id is required'}) + '\n');
    if(!req.query.name) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'name is required'}) + '\n');
    if(!req.query.desc) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'desc is required'}) + '\n');
    if(!req.query.type) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'type is required'}) + '\n');
    if(!req.query.gender) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'gender is required'}) + '\n');
    if(!req.query.franch) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'franch is required'}) + '\n');
    if(!req.query.number) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'number is required'}) + '\n');
    if(!req.query.excl) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'excl is required'}) + '\n');
    if(!req.query.value) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'value is required'}) + '\n');

    databaseLoad();
    const searchedUser = userList.find((user) => user.name == req.query.user);
    if(searchedUser) {
        const type = req.query.type as Types;
        if(!req.query.caract) {
            req.query.caract = '';
        } 
        if(searchedUser.addFunko(new Funko(Number(req.query.id), String(req.query.name), String(req.query.desc), type, String(req.query.gender), String(req.query.franch), Number(req.query.number), Boolean(req.query.excl), String(req.query.caract), Number(req.query.value))) != -1) {
            res.send(JSON.stringify({'type': 'success'}) + '\n');
        } else {
            res.status(500).send(JSON.stringify({'type': 'error', 'output': 'existing funko with same id'}) + '\n');
        }
    } else {
        res.status(500).send(JSON.stringify({'type': 'error', 'output': 'user not found'}) + '\n');
    }
    databaseSave();
    userList = [];
});

/**
 * Eliminar un funko de la lista de un usuario.
 */
app.delete('/funkos', (req, res) => {
    if(!req.query.user) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'user is required'}) + '\n');
    if(!req.query.id) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'id is required'}) + '\n');

    databaseLoad();
    const searchedUser = userList.find((user) => user.name == req.query.user);
    if(searchedUser) {
        if(searchedUser.deleteFunko(Number(req.query.id)) != -1) {
            res.send(JSON.stringify({'type': 'success'}) + '\n');
        } else {
            res.status(500).send(JSON.stringify({'type': 'error', 'output': `funko with id ${req.query.id} not found`}) + '\n');
        }
    } else {
        res.status(500).send(JSON.stringify({'type': 'error', 'output': 'user not found'}) + '\n');
    }
    databaseSave();
    userList = [];
});

/**
 * Modificar un funko existente de la lista de funkos de un usuario.
 */
app.patch('/funkos', (req, res) => {
    if(!req.query.id) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'id is required'}) + '\n');
    if(!req.query.name) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'name is required'}) + '\n');
    if(!req.query.desc) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'desc is required'}) + '\n');
    if(!req.query.type) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'type is required'}) + '\n');
    if(!req.query.gender) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'gender is required'}) + '\n');
    if(!req.query.franch) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'franch is required'}) + '\n');
    if(!req.query.number) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'number is required'}) + '\n');
    if(!req.query.excl) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'excl is required'}) + '\n');
    if(!req.query.value) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'value is required'}) + '\n');

    databaseLoad();
    const searchedUser = userList.find((user) => user.name == req.query.user);
    if(searchedUser) {
        const type = req.query.type as Types;
        if(!req.query.caract) {
            req.query.caract = '';
        } 
        if(searchedUser.modifyFunko(new Funko(Number(req.query.id), String(req.query.name), String(req.query.desc), type, String(req.query.gender), String(req.query.franch), Number(req.query.number), Boolean(req.query.excl), String(req.query.caract), Number(req.query.value))) != -1) {
            res.send(JSON.stringify({'type': 'success'}) + '\n');
        } else {
            res.status(500).send(JSON.stringify({'type': 'error', 'output': `funko with id ${req.query.id} not found`}) + '\n');
        }
    } else {
        res.status(500).send(JSON.stringify({'type': 'error', 'output': 'user not found'}) + '\n');
    }
    databaseSave();
    userList = [];
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});