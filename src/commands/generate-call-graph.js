
const fs = require("fs");
const parser = require("@babel/parser").parse;
const recast = require("recast");
const t = require("@babel/types");
const traverse = require("@babel/traverse").default;
const {Command, flags} = require('@oclif/command');

const { fromFile } = require("../utils.js");


function formatCallGraph(funcs){
  const lines = [];
  Object.keys(funcs).forEach((name) => {
    if(funcs[name].size || !funcs[name].size){
      const values = Array.from(funcs[name].values());
      const calls = values.join(", ");
      lines.push(`${name}->${calls}`);
    }

  });

  return lines;

}

function printCallGraph(lines){

  lines.forEach((l) => {
    console.log(l);

  });
}

function getCallGraph(ast){

  const funcs = {};
	
  function visitor(funcName, funcs){
    return {
      CallExpression(path){
        const callee = path.get("callee").node.name;
        if(callee !== undefined && callee.startsWith("$")){
          funcs[funcName].add(callee);
        }
      }
    };
  }
  traverse(ast, {
    FunctionDeclaration(path){
      const funcName = path.get("id").node.name;

      if(funcName.startsWith("$")){
        funcs[funcName] = new Set();
        path.get("body").traverse(visitor(funcName, funcs));
      }
    }
  });

  return funcs;

}

class GenerateCallGraphCommand extends Command {
  async run() {
    const {flags} = this.parse(GenerateCallGraphCommand);
    this.log(`COMING SOON!`);
  }
}

GenerateCallGraphCommand.description = `Generate a call graph from a bootstrapped script

A function call graph contains a list of all the WASM functions and the set of unique functions it calls inside its body.

This can be very useful to help you visualize the path a function takes to the next function.

Currently, this feature prints out a call graph in a text format that it's compatible with https://www.diagram.codes/d/tree.

With that being said, you cancopy and paste the contents of that file into diagram.codes to get a visual depiction of the call graph.


Example: Generate a call graph and saving the call graph to callgraph.txt

$ ticket generate-call-graph ticket.wasm.js callgraph.txt



`;

GenerateCallGraphCommand.flags = {
  'from-file': flags.string(
    {
      description: 'Load wasm from a file path',
      exclusive: ['from-url']
    }
  ),
  'from-url': flags.string(
    {
      description: 'Load wasm from an URL', 
      exclusive: ['from-file']
    }
  ),
  'user-agent': flags.string(
    {
      description: 'Sets a custom User-Agent', 
    }
  ),
  'run-times': flags.string(
    {
      description: "Run the _ticket generating process N times. Default value is set to 0 meaning it will run forevever until the bootstrapped script has exited",
      required: false,
      default: 0
    }
  )

};

GenerateCallGraphCommand.args = [
  {
    name: 'ticket_file',
    required : true,
    description : 'Ticket file'
  },
  {
    name : 'callgraph_file',
    required : true,
    description : 'Output file where to save the newly generated call graph '
  },
];


module.exports = GenerateCallGraphCommand;
