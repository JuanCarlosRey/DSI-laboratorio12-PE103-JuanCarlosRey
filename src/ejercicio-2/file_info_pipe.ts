import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import { spawn } from "child_process";
import { readFile } from "fs";

// Comando para ejecutarlo: node dist/ejercicio-2/file_info_pipe.js show --filename <ruta_fichero> --lines --words --characters

yargs(hideBin(process.argv))
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
            console.log(chalk.red("Please, specify a file!"));
        } else {
            readFile(argv.filename, (err) => {
                if(err) {
                    console.log(chalk.red(`The file ${argv.filename} does not exist.`));
                } else {
                    const cat = spawn('cat', [argv.filename]);
                    const wc = spawn('wc');

                    cat.stdout.pipe(wc.stdin);

                    wc.stdout.on('data', (data) => {
                        const wcOutput = data.toString().split(/\s+/);
                        if(argv.lines !== undefined) {
                            console.log(`File ${argv.filename} has ${chalk.yellow(wcOutput[1].trim())} lines.`);
                        }
                        if(argv.words !== undefined) {
                            console.log(`File ${argv.filename} has ${chalk.yellow(wcOutput[2].trim())} words.`);
                        }
                        if(argv.characters !== undefined) {
                            console.log(`File ${argv.filename} has ${chalk.yellow(wcOutput[3].trim())} characters.`);
                        }
                    });
                }
            });
        }
    })
    .help()
    .argv;