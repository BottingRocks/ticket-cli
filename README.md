ticket-cli
=======================

A simple cli app to help you with Supreme's ticket. It can bootstrap a ticket.wasm file into a NodeJS file, that
can run by itself. 

On the bin/ folder there is a copy of a wasm2js that it's compiled from https://github.com/WebAssembly/binaryen. 

You can install ticket-cli by running `npm -g install` or just execute it directly by from the bin/ folder. 

Note: You still have to call `npm install` if you intend on running it from the bin/ folder.

Example:

```js

./bin/run --help

//or if it is installed locally

ticket --help

```

ticket
<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)

# Commands
<!-- commands -->
* [`ticket bootstrap`](#ticket-bootstrap)

## `ticket bootstrap`

Bootstraps a ticket.wasm file into an equivalent stand-alone NodeJS script

```
USAGE
  $ ticket bootstrap TICKET_FILE BOOTSTRAP_FILE

ARGUMENTS
  TICKET_FILE     Ticket.wasm file
  BOOTSTRAP_FILE  Output file where to save the newly generated bootstrapped JS ticket.wasm

OPTIONS
  --run-times=run-times    Run the _ticket generating process N times. Default value is set to 0 meaning it will run forevever until the 
                           bootstrapped script has exited

  --timestamp=timestamp    Uses a static timestamp instead of using Date.now() on the bootstrapped script

  --user-agent=user-agent  Sets a custom User-Agent

DESCRIPTION
  Converts a ticket.wasm file into a NodeJS script that can be run independently from the browser. It uses wasm2js to 
  initially convert the wasm file into a Javascript file. 

  However, the sys calls are not correctly imported 
  so this command goes further into making some more additions via modifying the JS AST after the wasm-to-js conversion. It adds some browser's 

  properties such as Document, User-Agent, and anything else that ticket.wasm might request.

  Note: Supreme's ticket.wasm might start requesting other browser properties, so some of these flag options
  might change.

  Adding your User-Agent into the bootstrapped script is easy as adding
  the --user-agent flag and specifying the custom User-Agent you want.

  Note: Not passing a User-Agent will result in using the default User-Agent which is: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) 
  AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"

  In addition, you can also pass in the --run-times flag which will limit your bootstrapped script to only run N number of times. 
  This is especially good because Supreme's ticket.wasm runs indefinitely and will continue to generate new _ticket values in a never-ending
  loop until the script exits.

  Passing a static timestamp is also an option if you want your bootstrapped script to start with a desired timestamp.


  Example: Loading the wasm through a local file path that contains ticket.wasm

  $ ticket bootstrap ticket.wasm ticket.wasm.js


  Example: Using a custom User-Agent 

  $ ticket bootstrap --user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36" 
  ticket.wasm ticket.wasm.js


  Example: Limiting the bootstrapped script to generate a maximum of 5 _ticket cookies

  $ ticket bootstrap --run-times=5 ticket.wasm ticket.wasm.js


  Example: Passing a static timestamp

  $ ticket bootstrap --timestamp=1591993300052 ticket.wasm ticket.wasm.js


  To run the bootstrapped file is as simple as:

  $ node ticket.wasm.js

```

#Roadmap

The commands `generate-call-graph`, `log-func-args`, `log-func-calls`, and `print-props` will be implemented some time in the near future. 