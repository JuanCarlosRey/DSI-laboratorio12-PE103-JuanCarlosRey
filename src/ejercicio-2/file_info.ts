import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from 'fs';

yargs(hideBin(process.argv))
    // Obtiene el numero de lineas de un fichero.
    .command('show', 'show winfo of a specified file', {
        filename: {
            description: 'Filename',
            type: 'string',
            demandOption: true
        },
        lines: {
            description: 'If user wants to show number of lines',
            type: 'string',
            demandOption: false
        },
        words: {
            description: 'If user wants to show number of words',
            type: 'string',
            demandOption: false
        },
        caracters: {
            description: 'If user wants to show number of caracters',
            type: 'string',
            demandOption: false
        },
    }, (argv) => {
        if(argv.filename.length <= 3) {
            console.log("Please, specify a file!")
        } else {
            if(argv.lines !== undefined) {
                let i;
                let count = 1;
                fs.createReadStream(argv.filename)
                    .on('data', function(chunk: string | any[]) {
                        for (i = 0; i < chunk.length; ++i) {
                            if (chunk[i] == 10) count++;
                        }
                    })
                    .on('end', function() {
                        console.log("File has", count, "lines.");
                    })
                    .on('error', (err: { message: string | Uint8Array; }) => {
                        process.stderr.write(err.message);
                        console.log();
                    });
            }
            if(argv.words !== undefined) {
                let i;
                let count = 1;
                fs.createReadStream(argv.filename)
                    .on('data', function(chunk: string | any[]) {
                        for (i = 0; i < chunk.length; ++i) {
                            if (chunk[i] == 32 || chunk[i] == 10) count++;
                        }
                    })
                    .on('end', function() {
                        console.log("File has", count, "words.");
                    })
                    .on('error', (err: { message: string | Uint8Array; }) => {
                        process.stderr.write(err.message);
                        console.log();
                    });
            }
            if(argv.caracters !== undefined) {
                let i;
                let count = 1;
                fs.createReadStream(argv.filename)
                    .on('data', function(chunk: string | any[]) {
                        for (i = 0; i < chunk.length; ++i) {
                            if (chunk[i] != 10) count++;
                        }
                    })
                    .on('end', function() {
                        console.log("File has", count - 1, "caracters.");
                    })
                    .on('error', (err: { message: string | Uint8Array; }) => {
                        process.stderr.write(err.message);
                        console.log();
                    });
            }
        }
    })
    .help()
    .argv;