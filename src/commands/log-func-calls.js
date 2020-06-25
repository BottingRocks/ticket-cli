const {Command, flags} = require('@oclif/command');

class LogFuncCallsCommand extends Command {
  async run() {
    const {flags} = this.parse(LogFuncCallsCommand);
    this.log(`COMING SOON!`);
  }
}

LogFuncCallsCommand.strict = false;
LogFuncCallsCommand.description = `Add a console.log before each WASM function call, printing the calling function, and the function from where it's called.

This command adds a console.log that prints out the function which function is being called, in what function is being called,  and what values
are being passed to the calling function

You can add a console.log to all the WASM calls by passing the --all flag. 

If you don't choose to use the --all flag, then you must pass in at least 1 function name you want to log 
all calls to using the format fromFunction->toFunction.

Example: Adding a console.log on all the calls from function 34 to function 36 and from function 70 to function 30. 

$ ticket log-func-calls ticket.wasm.js 34->36 70->30


Example: Adding a console.log to all the WASM functions calls.

$ ticket log-func-calls ticket.wasm.js --all

`;

LogFuncCallsCommand.flags = {
  'all': flags.boolean(
    {
      description: 'Add a console.log to all WASM function calls',
      default: false
    }
  )
};

LogFuncCallsCommand.args = [
  {
    name : 'bootstrapped_file',
    required : true,
    description : 'Bootstrapped ticket.wasm.js file'
  },
];

module.exports = LogFuncCallsCommand;
