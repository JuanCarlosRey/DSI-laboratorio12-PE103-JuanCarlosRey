import { exec } from 'child_process';
import net from 'net';

net.createServer((connection) => {
    console.log('A client has connected.');
    
    connection.on('data', (data) => {
        const command = JSON.parse(data.toString());
        console.log(`Command received: ${command.command} ${command.args.join(" ")}`)

        if(command.command == '') {
            connection.write(JSON.stringify({'type': 'not_valid'}) + '\n');
            return;
        }
        
        exec(`${command.command} ${command.args.join(" ")}`, (error, stdout) => {
            if(error) {
                connection.write(JSON.stringify({'type': 'error'}) + '\n');
                return;
            } else {
                connection.write(JSON.stringify({'type': 'run', 'output': stdout}) + '\n');
                return;
            }
        });
    })

    connection.on('close', () => {
        console.log('A client has disconnected.');
    });

}).listen(60300, () => {
    console.log('Waiting for clients to connect.');
});