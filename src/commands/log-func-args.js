const {Command, flags} = require('@oclif/command');

class LogFuncArgsCommand extends Command {
  async run() {
    const {flags} = this.parse(LogFuncArgsCommand);
    this.log(`COMING SOON!`);
  }
}

LogFuncArgsCommand.strict = false;
LogFuncArgsCommand.description = `Add a console.log as the first node inside the body of each WASM function


This command adds a console.log that prints out the function name and the arguments passed to that function.

You can add a console.log to all the WASM functions by passing the --all flag. Otherwise, pass in the individual function names 
you want to only have the console.log added to.

Example: Adding a console.log to the WASM functions 34, 94, and 8.

$ ticket log-func-args ticket.wasm.js 34 94 8


Example: Adding a console.log to all the WASM functions.

$ ticket log-func-args ticket.wasm.js --all

`;

LogFuncArgsCommand.flags = {
  'all': flags.boolean(
    {
      description: 'Add a console.log to all WASM functions logging their parameters',
      default: false
    }
  )
};

LogFuncArgsCommand.args = [
  {
    name : 'bootstrapped_file',
    required : true,
    description : 'Bootstrapped ticket.wasm.js file'
  },
];

module.exports = LogFuncArgsCommand;
