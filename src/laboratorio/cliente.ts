import net from 'net';

const client = net.connect({port: 60300});

// Obtenemos el comando
const command: string[] = [];
const args: string[] = [];
for(let i = 2; i < process.argv.length; i++) {
    if(i == 2) {
        command.push(process.argv[i]);
    } else {
        args.push(process.argv[i]);
    }
}

// Lo enviamos al servidor
client.write(JSON.stringify({'command': command, 'args': args}));

let wholeData = '';
client.on('data', (dataChunk) => {
    wholeData += dataChunk;
    const out_message = JSON.parse(wholeData);

    if(out_message.type === "run") {
        console.log("Command executed successfully:");
        console.log(`Output: ${out_message.output}`);
    } else if(out_message.type === "error") {
        console.log("There was an error executing the command!");
    } else if(out_message.type === "not_valid") {
        console.log("An empty command is not valid!");
    } else {
        console.log(`Message type ${out_message.type} is not valid`);
    }

    client.destroy()
});