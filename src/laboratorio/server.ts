import { MongoClient } from 'mongodb';
import { Types, Funko } from './funko';
import express from 'express';

const app = express();

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funko-app';

/**
 * Obtener información de uno o varios funkos de la lista de funkos de un usuario.
 */
 app.get('/funkos', (req, res) => {
    if(!req.query.user) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'user is required'}) + '\n');

    if(!req.query.id) { // Función list
        MongoClient.connect(dbURL).then((client) => {
            const db = client.db(dbName);
          
            return db.collection<Funko>(String(req.query.user)).find().toArray();
        }).then((result) => {
            res.send(JSON.stringify({'type': 'success', 'output': result}) + '\n');
        }).catch((error) => {
            res.status(500).send(JSON.stringify({'type': 'error', 'output': error}) + '\n');
        });   
    } else { // Función show
        MongoClient.connect(dbURL).then((client) => {
            const db = client.db(dbName);
          
            return db.collection<Funko>(String(req.query.user)).findOne({
                _funkoId: Number(req.query.id),
            });
        }).then((result) => {
            if(result != null) {
                res.send(JSON.stringify({'type': 'success', 'output': result}) + '\n');
            } else {
                res.status(500).send(JSON.stringify({'type': 'error', 'output': 'funko not found'}) + '\n');
            }
        }).catch((error) => {
            res.status(500).send(JSON.stringify({'type': 'error', 'output': error}) + '\n');
        });
    }  
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

    MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
        const type = req.query.type as Types;
        if(!req.query.caract) {
            req.query.caract = '';
        } 
        const item = new Funko(Number(req.query.id), String(req.query.name), String(req.query.desc), type, String(req.query.gender), String(req.query.franch), Number(req.query.number), Boolean(req.query.excl), String(req.query.caract), Number(req.query.value));
        return db.collection<Funko>(String(req.query.user)).insertOne(item);
    }).then((result) => {
        res.send(JSON.stringify({'type': 'success', 'output': result}) + '\n');
    }).catch((error) => {
        res.status(500).send(JSON.stringify({'type': 'error', 'output': error}) + '\n');
    });
});

/**
 * Eliminar un funko de la lista de un usuario.
 */
 app.delete('/funkos', (req, res) => {
    if(!req.query.user) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'user is required'}) + '\n');
    if(!req.query.id) res.status(400).send(JSON.stringify({'type': 'error', 'output': 'id is required'}) + '\n');

    MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
      
        return db.collection<Funko>(String(req.query.user)).deleteOne({
            _funkoId: Number(req.query.id),
        });
    }).then((result) => {
        if(result.deletedCount != 0) {
            res.send(JSON.stringify({'type': 'success'}) + '\n');
        } else {
            res.status(500).send(JSON.stringify({'type': 'error', 'output': `funko with id ${req.query.id} not found`}) + '\n');
        }
    }).catch((error) => {
        res.status(500).send(JSON.stringify({'type': 'error', 'output': error}) + '\n');
    });
});

/**
 * Modificar un funko existente de la lista de funkos de un usuario.
 */
 app.patch('/funkos', (req, res) => {
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

    MongoClient.connect(dbURL).then((client) => {
        const db = client.db(dbName);
        const type = req.query.type as Types;
        if(!req.query.caract) {
            req.query.caract = '';
        } 
        const item = new Funko(Number(req.query.id), String(req.query.name), String(req.query.desc), type, String(req.query.gender), String(req.query.franch), Number(req.query.number), Boolean(req.query.excl), String(req.query.caract), Number(req.query.value));
        return db.collection<Funko>(String(req.query.user)).updateOne({
            _funkoId: Number(req.query.id),
        }, {
            $set: item,
        });
    }).then((result) => {
        if(result.modifiedCount != 0) {
            res.send(JSON.stringify({'type': 'success'}) + '\n');
        } else {
            res.status(500).send(JSON.stringify({'type': 'error', 'output': `funko with id ${req.query.id} not found`}) + '\n');
        }
    }).catch((error) => {
        res.status(500).send(JSON.stringify({'type': 'error', 'output': error}) + '\n');
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});