# Notes from the course

## appendFile now appendFileSync
fs.appendFile(‘greetings.txt’, ‘Hello’);

To get rid of callback error; in node 7 or greater, you need to use:

fs.appendFileSync(‘greetings.txt’, ‘Hello’);
or 
fs.appendFile(‘greetings.txt’, ‘Hello’, function (err) {
if (err) {
console.log(‘Unable to write to file’);
}
});


## Installing NPM
`npm init`
`npm install` (as usual add to .gitignore)


## Installing nodemon
It’s a command line utility that gets executed from the terminal


## Installing yargs
npm install yargs@4.7.1

const argv = yargs.argv;

usage = argv.”title”

var command = argv._[0];

## Axios
if (response.data.stats === ‘something’) {
throw new Error(‘Unable to fetch data from API servers’)
}


The following is the basic error catch message (one catch for all promises, or individual error as above (or use both for specific errors for some, and generic errors for others.))


.catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.')
    } else {
        console.log(e.message);
    }
});
