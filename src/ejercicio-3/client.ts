import net from 'net';
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Funko, Types } from './funko';
import { OperableUser } from './operaciones_usuario';

const client = net.connect({port: 60300});

/**
 * Función principal del programa.
 */
yargs(hideBin(process.argv))
    // Comando para añadir un nuevo funko a la lista del usuario.
    .command('add', 'adds a funko', {
        user: {
            description: 'New funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'New funko ID',
            type: 'number',
            demandOption: true
        },
        name: {
            description: 'New funko name',
            type: 'string',
            demandOption: true
        },
        desc: {
            description: 'New funko description',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'New funko type',
            type: 'string',
            demandOption: true
        },
        gender: {
            description: 'New funko gender',
            type: 'string',
            demandOption: true
        },
        franchise: {
            description: 'New funko franchise',
            type: 'string',
            demandOption: true
        },
        number: {
            description: 'New funko number',
            type: 'number',
            demandOption: true
        },
        exclusive: {
            description: 'New funko exclusivity',
            type: 'boolean',
            demandOption: true
        },
        caract: {
            description: 'New funko special caracteristics',
            type: 'string',
            demandOption: false
        },
        value: {
            description: 'New funko value',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
        if(argv.caract != undefined) {
            client.write(JSON.stringify({'action_type': 'add', 'user': argv.user, 'id': argv.id, 'name': argv.name, 
            'desc': argv.desc, 'type': argv.type, 'gender': argv.gender, 'franchise': argv.franchise, 'number': argv.number, 
            'exclusive': argv.exclusive, 'caract': argv.caract, 'value': argv.value}));
        } else {
            client.write(JSON.stringify({'action_type': 'add', 'user': argv.user, 'id': argv.id, 'name': argv.name, 
            'desc': argv.desc, 'type': argv.type, 'gender': argv.gender, 'franchise': argv.franchise, 'number': argv.number, 
            'exclusive': argv.exclusive, 'caract': '', 'value': argv.value}));
        }   
    })
    
    // Comando para modificar un funko ya existente en la lista del usuario.
    .command('update', 'edits a funko', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'Funko ID',
            type: 'number',
            demandOption: true
        },
        name: {
            description: 'Funko name',
            type: 'string',
            demandOption: true
        },
        desc: {
            description: 'Funko description',
            type: 'string',
            demandOption: true
        },
        type: {
            description: 'Funko type',
            type: 'string',
            demandOption: true
        },
        gender: {
            description: 'Funko gender',
            type: 'string',
            demandOption: true
        },
        franchise: {
            description: 'Funko franchise',
            type: 'string',
            demandOption: true
        },
        number: {
            description: 'Funko number',
            type: 'number',
            demandOption: true
        },
        exclusive: {
            description: 'Funko exclusivity',
            type: 'boolean',
            demandOption: true
        },
        caract: {
            description: 'Funko special caracteristics',
            type: 'string',
            demandOption: false
        },
        value: {
            description: 'Funko value',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
        if(argv.caract != undefined) {
            client.write(JSON.stringify({'action_type': 'update', 'user': argv.user, 'id': argv.id, 'name': argv.name, 
            'desc': argv.desc, 'type': argv.type, 'gender': argv.gender, 'franchise': argv.franchise, 'number': argv.number, 
            'exclusive': argv.exclusive, 'caract': argv.caract, 'value': argv.value}));
        } else {
            client.write(JSON.stringify({'action_type': 'update', 'user': argv.user, 'id': argv.id, 'name': argv.name, 
            'desc': argv.desc, 'type': argv.type, 'gender': argv.gender, 'franchise': argv.franchise, 'number': argv.number, 
            'exclusive': argv.exclusive, 'caract': '', 'value': argv.value}));
        }
    })

    // Comando para elimiar un funko ya existente en la lista del usuario.
    .command('remove', 'delete a funko', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'Funko ID',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
        client.write(JSON.stringify({'action_type': 'remove', 'user': argv.user, 'id': argv.id}));
    })

    // Comando para listar los funkos de un usuario.
    .command('read', 'list all existing funkos on a list', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
    }, (argv) => {
        client.write(JSON.stringify({'action_type': 'read', 'user': argv.user}));
    })

    // Comando para listar la información de un funko en concreto.
    .command('list', 'show a detailed info of a funko', {
        user: {
            description: 'Funko owner',
            type: 'string',
            demandOption: true
        },
        id: {
            description: 'Funko ID',
            type: 'number',
            demandOption: true
        },
    }, (argv) => {
        client.write(JSON.stringify({'action_type': 'list', 'user': argv.user, 'id': argv.id}));
    })
    .help()
    .argv;

let wholeData = '';
/**
 * Parámetro con el que el cliente recibe los resultados de la ejecución del comando.
 */
client.on('data', (dataChunk) => {
    wholeData += dataChunk;
    const out_message = JSON.parse(wholeData);

    if(out_message.type == "success") {
        console.log(chalk.green(out_message.message));
    } else if(out_message.type == "read" || out_message.type == "list") {
        const funkoList: Funko[] = [];
        out_message.list.forEach((funko: { _id: number; _name: string; _description: string; _type: Types; _gender: string; _franchise: string; _number: number; _exclusive: boolean; _specialCaracteristics: string; _value: number; }) => {
            funkoList.push(new Funko(funko._id, funko._name, funko._description, funko._type, funko._gender, funko._franchise, 
                funko._number, funko._exclusive, funko._specialCaracteristics, funko._value));
        });
        const user = new OperableUser(0, '', funkoList);
        if(out_message.type == "read") {
            user.listFunko();
        } else {
            user.showFunkoInfo(out_message.id);
        }
    } else {
        console.log(chalk.red(out_message.message));
    }
});