const {Command, flags} = require('@oclif/command');

class PrintPropertiesCommand extends Command {
  async run() {
    const {flags} = this.parse(PrintPropertiesCommand);
    this.log(`COMING SOON!`);
  }
}

PrintPropertiesCommand.description = `Print Ticket's properties from a bootstrapped file

Sometimes it is useful to find out all the Ticket's properties a bootstrapped file has. 

Some examples are: document, navigator, _ticket, performance, etc.

Most of these properties are constructed from individual characters derived from 8-bit unsigned ints.

In a nutshell, this command sole purpose is to extract all the strings constructed in this manner and display their location(the function where it is created).

Note:You must pass in a bootstrapped JS file, not the ticket.wasm file as this command exclusively traverses the JS AST to 
find these properties.


Example: Printing out Ticket's properties

$ ticket print-props ticket.wasm.js

`;

PrintPropertiesCommand.args = [
  {
    name : 'bootstrapped_file',
    required : true,
    description : 'Bootstrapped ticket.wasm.js file'
  },
];

module.exports = PrintPropertiesCommand;
