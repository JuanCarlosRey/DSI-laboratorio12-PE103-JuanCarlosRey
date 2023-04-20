import express from 'express';
import { exec } from 'child_process';

const server = express();

/**
 * Ruta execmd para ejecutar un comando Unix/Linux.
 */
server.get('/execmd', (req, res) => {
    if(!req.query.cmd) {
        return res.status(400).end();
    }

    let args = req.query.arg;

    if(args === undefined) {
        args = '';
    }

    exec(`${req.query.cmd} ${args}`, (error, stdout, stderr) => {
        if(error) {
            return res.status(500).send(JSON.stringify({'type': 'error', 'output': stderr}) + '\n').end();
        } else {
            return res.send(JSON.stringify({'type': 'success', 'output': stdout}) + '\n').end();
        }
    });

    return;
});

/**
 * Ruta no válida.
 */
server.get('*', (_, res) => {
    res.status(404).end();
});

server.listen(3000, () => {
    console.log('Server is up on port 3000');
})