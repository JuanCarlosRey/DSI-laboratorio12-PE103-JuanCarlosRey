/* eslint-disable no-case-declarations */
import { Funko, Types } from "./funko";
import { OperableUser } from "./operaciones_usuario";
import { databaseLoad, databaseSave } from "./database_functions";
import net from 'net';

// Lista de usuarios del sistema
export let userList: OperableUser[] = [];

net.createServer((connection) => {
    console.log('A client has connected.');

    connection.on('data', (data) => {
        const command = JSON.parse(data.toString());
        console.log(`Request received. Command type: ${command.action_type}.`);
        databaseLoad();

        switch (command.action_type) {
            case 'add':
                const type = command.type as Types;
                const newFunko = new Funko(command.id, command.name, command.desc, type, command.gender, command.franchise, 
                    command.number, command.exclusive, command.caract, command.value);
                if(userList.find(user => user.name == command.user) != undefined) {
                    if(userList.find(user => user.name == command.user)?.addFunko(newFunko) == 0) {
                        connection.write(JSON.stringify({'type': 'success', 'message': 'Funko added correctly.'}) + '\n');
                        databaseSave();
                    } else {
                        connection.write(JSON.stringify({'type': 'error', 'message': 'There is an existing funko with this id.'}) + '\n');
                    }
                } else {
                    connection.write(JSON.stringify({'type': 'error', 'message': 'User not found.'}) + '\n');
                }
                userList = [];
                break;
            case 'update':
                const updateType = command.type as Types;
                const updateFunko = new Funko(command.id, command.name, command.desc, updateType, command.gender, command.franchise, 
                    command.number, command.exclusive, command.caract, command.value);
                if(userList.find(user => user.name == command.user) != undefined) {
                    if(userList.find(user => user.name == command.user)?.modifyFunko(updateFunko) == 0) {
                        connection.write(JSON.stringify({'type': 'success', 'message': 'Funko updated correctly.'}) + '\n');
                        databaseSave();
                    } else {
                        connection.write(JSON.stringify({'type': 'error', 'message': 'There is not a funko with that id.'}) + '\n');
                    }
                } else {
                    connection.write(JSON.stringify({'type': 'error', 'message': 'User not found.'}) + '\n');
                }
                userList = [];
                break;
            case 'remove':
                if(userList.find(user => user.name == command.user) != undefined) {
                    if(userList.find(user => user.name == command.user)?.deleteFunko(command.id) == 0) {
                        connection.write(JSON.stringify({'type': 'success', 'message': 'Funko deleted correctly.'}) + '\n');
                        databaseSave();
                    } else {
                        connection.write(JSON.stringify({'type': 'error', 'message': 'There is not a funko with that id.'}) + '\n');
                    }
                } else {
                    connection.write(JSON.stringify({'type': 'error', 'message': 'User not found.'}) + '\n');
                }
                userList = [];
                break;
            case 'read':
                if(userList.find(user => user.name == command.user) != undefined) {
                    connection.write(JSON.stringify({'type': 'read', 'list': userList.find(user => user.name == command.user)?.funkoCollection}));
                } else {
                    connection.write(JSON.stringify({'type': 'error', 'message': 'User not found.'}) + '\n');
                }
                userList = [];
                break;
            case 'list':
                if(userList.find(user => user.name == command.user) != undefined) {
                    if(userList.find(user => user.name == command.user)?.funkoCollection.find(funko => funko.id == command.id) != undefined) {
                        connection.write(JSON.stringify({'type': 'list', 'list': userList.find(user => user.name == command.user)?.funkoCollection, 'id': command.id}));
                    } else {
                        connection.write(JSON.stringify({'type': 'error', 'message': 'There is not a funko with that id.'}) + '\n');
                    }
                } else {
                    connection.write(JSON.stringify({'type': 'error', 'message': 'User not found.'}) + '\n');
                }
                userList = [];
                break;
            default:
                connection.write(JSON.stringify({'type': 'error', 'message': 'Request type not valid.'}) + '\n');
        }
        connection.end();
    });

    connection.on('close', () => {
        console.log('A client has disconnected.');
    });
    
}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
});