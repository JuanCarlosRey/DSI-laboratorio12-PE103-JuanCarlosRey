import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { spawn } from "child_process";

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
        characters: {
            description: 'If user wants to show number of characters',
            type: 'string',
            demandOption: false
        },
    }, (argv) => {
        if(argv.filename.length <= 3) {
            console.log("Please, specify a file!")
        } else {
            if(argv.lines !== undefined) {
                const wc = spawn('wc', ['-l', argv.filename]);
                wc.stdout.pipe(process.stdout);
            }
            if(argv.words !== undefined) {
                const wc = spawn('wc', ['-w', argv.filename]);
                wc.stdout.pipe(process.stdout);
            }
            if(argv.characters !== undefined) {
                const wc = spawn('wc', ['-m', argv.filename]);
                wc.stdout.pipe(process.stdout);
            }
        }
    })
    .help()
    .argv;