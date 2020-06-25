
const fs = require("fs");

const generate = require("@babel/generator").default;
const parser = require("@babel/parser").parse;
const recast = require("recast");
const t = require("@babel/types");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;

const { exec } = require("child_process");
const {Command, flags} = require('@oclif/command');

const { fromString } = require("../utils.js");


const ticketBootstrapTemplate = template(`
ticket : {

  const request = require("request-promise");
  const crypto = require("crypto");

  const {
    performance
  } = require("perf_hooks");

  var supjar = request.jar();

  var document = {
    get cookie() {
      if (supjar != undefined) {
        let c = supjar._jar.getCookieStringSync("https://www.supremenewyork.com");
        return c;
      } else
        return "lastVisitedFragment=";
    },

    set cookie(value) {
      if (supjar != undefined) {
        supjar._jar.setCookie(value, "https://www.supremenewyork.com", (error, cookie) => {
          if (error) {
            throw error;
          }
        });

        console.log(value);
      }
    }
  };

  var navigator = {
    userAgent: %%userAgent%%
  };

  var runTimes = %%runTimes%%;
  var currentRun = 1;

  var window = {
    crypto: {
      getRandomValues: crypto.randomFillSync
    },
    __wasmExecute() {}
  };

  var outputBuf = "";

  var global = {
    Uint8Array,
    window,
    document,
    navigator,

    fs: {
      constants: {
        O_WRONLY: -1,
        O_RDWR: -1,
        O_CREAT: -1,
        O_TRUNC: -1,
        O_APPEND: -1,
        O_EXCL: -1
      },

      writeSync(fd, buf) {
        outputBuf += decoder.decode(buf);
        const nl = outputBuf.lastIndexOf("\\n");

        if (nl != -1) {
          outputBuf = outputBuf.substr(nl + 1);
        }

        return buf.length;
      },

      write(fd, buf, offset, length, position, callback) {
        if (offset !== 0 || length !== buf.length || position !== null) {
          callback(enosys());
          return;
        }

        const n = this.writeSync(fd, buf);
        callback(null, n);
      },

      open(path, flags, mode, callback) {
        callback(enosys());
      },

      fsync(fd, callback) {
        callback(null);
      }
    }
  };

  const enosys = () => {
    const err = new Error("not implemented");
    err.code = "ENOSYS";
    return err;
  };

  var b = new TextEncoder("utf-8"), e = new TextDecoder("utf-8"), g = [];

  class Go {
    constructor() {
      var a = this;

      a.exit = code => {
        if (code !== 0) {
          console.warn("exit code:", code);
        }
      };

      a._exitPromise = new Promise(resolve => {
        a._resolveExitPromise = resolve;
      });

      a._pendingEvent = null;
      a._scheduledTimeouts = new Map();
      a._nextCallbackTimeoutID = 1;

      var c = function() {
          return new DataView(memasmFunc);
        },
        f = function(b) {
          var d = c().getFloat64(b, !0);

          if (0 !== d) {
            if (!isNaN(d))
              return d;

            b = c().getUint32(b, !0);
            return a._values[b];
          }
        },
        d = function(b, d) {
          if ("number" === typeof d)
            isNaN(d) ? (c().setUint32(b + 4, 2146959360, !0), c().setUint32(b, 0, !0)) : 0 === d ? (c().setUint32(b + 4, 2146959360, !0), c().setUint32(b, 1, !0)) : c().setFloat64(b, d, !0);
          else {
            switch (d) {
              case void 0:
                c().setFloat64(b, 0, !0);
                return;
              case null:
                c().setUint32(b + 4, 2146959360, !0);
                c().setUint32(b, 2, !0);
                return;
              case !0:
                c().setUint32(b + 4, 2146959360, !0);
                c().setUint32(b, 3, !0);
                return;
              case !1:
                c().setUint32(b + 4, 2146959360, !0);
                c().setUint32(b, 4, !0);
                return;
            }

            var f = a._refs.get(d);
            void 0 === f && (f = a._values.length, a._values.push(d), a._refs.set(d, f));
            var e = 0;

            switch (typeof d) {
              case "string":
                e = 1;
                break;
              case "symbol":
                e = 2;
                break;
              case "function":
                e = 3;
            }

            c().setUint32(b + 4, 2146959360 | e, !0);
            c().setUint32(b, f, !0);
          }
        },
        m = function(a, b, c) {
          c = Array(b);

          for (var d = 0; d < b; d++)
            c[d] = f(a + 8 * d);

          return c;
        },
        l = function(b, c) {
          return e.decode(new DataView(memasmFunc, b, c));
        },
        timestamp = %%useStaticTimestamp%% ? %%useStaticTimestamp%% : Date.now() - performance.now();

      this.importObject = {
        wasi_unstable: {
          fd_write: function(a, b, d, f) {
            if (1 == a) for (a = 0; a < d; a++) {
              var k = b + 8 * a, q = c().getUint32(k + 0, !0);
              k = c().getUint32(k + 4, !0);

              for (var h = 0; h < k; h++) {
                var p = c().getUint8(q + h);
                13 != p && (10 == p ? (p = e.decode(new Uint8Array(g)), g = [], console.log(p)) : g.push(p));
              }
            } else
              console.error("invalid file descriptor:", a);

            c().setUint32(f, 0, !0);
            return 0;
          }
        },

        env: {
          "runtime.ticks": function() {
            return timestamp + performance.now();
          },

          "runtime.sleepTicks": function(b) {
            setTimeout(retasmFunc.go_scheduler, b);
          },

          "syscall/js.stringVal": function(a, b, c) {
            b = l(b, c);
            d(a, b);
          },

          "syscall/js.valueGet": function(a, b, c, e) {
            c = l(c, e);
            b = f(b);
            c == "process" && (c = "fakeprocess");
            b = Reflect.get(b, c);
            d(a, b);
          },

          "syscall/js.valueSet": function(a, b, c, d) {
            a = f(a);
            b = l(b, c);
            d = f(d);
            Reflect.set(a, b, d);
          },

          "syscall/js.valueIndex": function(a, b, c) {
            d(a, Reflect.get(f(b), c));
          },

          "syscall/js.valueSetIndex": function(a, b, c) {
            Reflect.set(f(a), b, f(c));
          },

          "syscall/js.valueCall": function(a, b, e, g, h, n, v) {
            b = f(b);
            e = l(e, g);
            h = m(h, n, v);

            try {
              var k = Reflect.get(b, e);
              d(a, Reflect.apply(k, b, h));
              c().setUint8(a + 8, 1);
            } catch (x) {
              d(a, x), c().setUint8(a + 8, 0);
            }
          },

          "syscall/js.valueInvoke": function(a, b, e, g, h) {
            try {
              var k = f(b), q = m(e, g, h);
              d(a, Reflect.apply(k, void 0, q));
              c().setUint8(a + 8, 1);
            } catch (w) {
              d(a, w), c().setUint8(a + 8, 0);
            }
          },

          "syscall/js.valueNew": function(a, b, e, g, h) {
            b = f(b);
            e = m(e, g, h);

            try {
              d(a, Reflect.construct(b, e)), c().setUint8(a + 8, 1);
            } catch (u) {
              d(a, u), c().setUint8(a + 8, 0);
            }
          },

          "syscall/js.valueLength": function(a) {
            return f(a).length;
          },

          "syscall/js.valuePrepareString": function(a, e) {
            e = String(f(e));
            e = b.encode(e);
            d(a, e);
            a += 8;
            e = e.length;
            c().setUint32(a + 0, e, !0);
            c().setUint32(a + 4, Math.floor(e / 4294967296), !0);
          },

          "syscall/js.valueLoadString": function(b, c, d, e) {
            b = f(b);
            new Uint8Array(memasmFunc, c, d).set(b);
          }
        }
      };
    }

    async run(instance) {
      this._inst = instance;
      this._values = [NaN, 0, null, true, false, global];
      this._refs = new Map();
      this._callbackShutdown = false;
      this.exited = false;

      while (true) {
        const callbackPromise = new Promise(resolve => {
          this._resolveCallbackPromise = () => {
            if (this.exited) {
              throw new Error("bad callback: Go program has already exited");
            }

            setTimeout(resolve, 0);
          };
        });

        retasmFunc._start();

        if (this.exited) {
          break;
        }

        await callbackPromise;
      }
    }

    _resume() {
      if (this.exited) {
        throw new Error("Go program has already exited");
      }

      retasmFunc.resume();

      if (this.exited) {
        this._resolveExitPromise();
      }
    }

    _makeFuncWrapper(id) {
      const go = this;

      return function() {
        const event = {
          id: id,
          this: this,
          args: arguments
        };

        go._pendingEvent = event;
        go._resume();
        return event.result;
      };
    }
  }

  const go = new Go();
  var tempRet0 = 0;

  var setTempRet0 = function(value) {
    tempRet0 = value;
  };

  var getTempRet0 = function() {
    return tempRet0;
  };
}
`, {sourceType : "script"});


class BootstrapCommand extends Command {

  wasmAst = null;
  skeletonAst = null;
  bootstrap_file = null;

  
  async run() {
    const {flags, args} = this.parse(BootstrapCommand);
    const { ticket_file, bootstrap_file } = args;
    this.bootstrap_file = bootstrap_file;

    const defaultOptimizationLevel = 2;

    const defaultUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";
    const userAgent = flags.userAgent || defaultUserAgent;
    const runTimes = flags['run-times'];

    this.log(`Creating a new bootstrapped NodeJS file with options: \t\t\n run-times:${runTimes} \t\t\n userAgent:${userAgent} \t\t\n Using a static timestamp:${ flags.timestamp ? flags.timestamp : false}`);

    // Create a skeleton bootstrapped script
    await this.createBootstrapSkeleton(flags.timestamp, userAgent, runTimes);

    //Call wasm2js with the default optimization level to convert the wasm to js
    await this.convertWasmToJS(ticket_file, defaultOptimizationLevel, runTimes);


  }

  async createBootstrapSkeleton(useStaticTimestamp, userAgent, runTimes){

    const source = ticketBootstrapTemplate({
      useStaticTimestamp : t.numericLiteral(parseInt(useStaticTimestamp)),
      userAgent : t.stringLiteral(userAgent),
      runTimes : t.numericLiteral(parseInt(runTimes))
    });

    let code = generate(source).code;

    //Now lets do an ugly hack to increase the speed by removing the last and first line of our source code.
    //Basically, allowing us to remove the LabeledStatement without traversing the AST which takes longer to do.
    const lines = code.split("\n");
    lines.pop();
    lines.shift();
    this.skeletonAst = parser(lines.join("\n"));

  }
  
  editRunTimes(ast, runTimes){

    const isHostFunc = (path) => path.node.id.name == '$39';
    const isFunctionTable = (path) => (
      path.node.object.name == "FUNCTION_TABLE" &&
      path.node.computed && 
      path.node.property.type == "MemberExpression"
    );

    const wrapFunctionTable = (path, runTimes) => {
      const functionTableNode = path.parentPath.node;
      const incrementRunIfNotFinished = t.logicalExpression(
        "||",
        t.binaryExpression(
          "==",
          t.identifier("currentRun"),
          t.identifier("runTimes")
        ),
        t.sequenceExpression(
          [
            t.updateExpression("++", t.identifier("currentRun"), false),
            functionTableNode
          ]
        )
      );

      const wrappedIf = t.ifStatement(
        t.unaryExpression("!", t.identifier("runTimes"), true),
        t.expressionStatement(functionTableNode),
        t.ifStatement(
          t.identifier("runTimes"),
          t.expressionStatement(incrementRunIfNotFinished),
          t.expressionStatement(functionTableNode)
        )
      );

      return wrappedIf;

    };

    const hostFuncVisitor = {
      FunctionDeclaration(path){
        if(isHostFunc(path)){
          path.traverse(functionTableVisitor);
        }
      }

    };
    const functionTableVisitor = {
      MemberExpression(path){
        if(isFunctionTable(path)){
          const wrappedIf = wrapFunctionTable(path, runTimes);
          path.parentPath.parentPath.replaceWith(wrappedIf);
          path.parentPath.parentPath.stop();
        }
      }
    };

    traverse(ast, hostFuncVisitor);

    
  }


  async convertWasmToJS(wasmFile, optimizationLevel, runTimes){
    const that = this;
    exec(`./bin/wasm2js -O${optimizationLevel} ${wasmFile}`, (error, stdout, stderr) => {
      if (error) {
        that.error(`There has been an error converting ${wasmFile} to a NodeJS stand-alone bootstrapped script: ${error.message}`);
        return;
      }
      if (stderr) {
        that.error(`There has been an error converting ${wasmFile} to a NodeJS stand-alone bootstrapped script: ${stderr}`);
        return;
      }
      that.wasmAst = fromString(stdout, "module");

      that.editRunTimes(that.wasmAst, runTimes);

      //We don't need no stinky exports and imports so let's remove them
      that.removeImportsAndExports(that.wasmAst);

      //Now we are going to add the syscalls functions manually right before retasmFunc
      that.addSysCalls(that.wasmAst);

      //Let's merge the skeleton with the converted wasm now
      const bootstrappedAst = this.mergeConvertedWasmWithSkeleton();

      //Finally let's save the newly bootstrapped file into the bootstrap_file location
      fs.writeFileSync(that.bootstrap_file, recast.print(bootstrappedAst).code); 
      that.log(`\nDone! Successfully saved bootstrapped file at:${that.bootstrap_file}`);
    });

  }

  removeImportsAndExports(ast){
    traverse(ast, {
      ImportDeclaration(path){
        path.remove();

      },
      ExportNamedDeclaration(path){
        path.remove();
      }
    });

  }

  addSysCalls(ast){
    traverse(ast, {
      VariableDeclarator(path){
        if(path.node.id.name == "retasmFunc"){
          const parentPath = path.parentPath;
          parentPath.insertBefore(template(`const fd_write = go.importObject.wasi_unstable["fd_write"];`)());
          parentPath.insertBefore(template(`const runtime_ticks = go.importObject.env["runtime.ticks"];`)());
          parentPath.insertBefore(template(`const runtime_sleepTicks = go.importObject.env["runtime.sleepTicks"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueLength = go.importObject.env["syscall/js.valueLength"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueIndex = go.importObject.env["syscall/js.valueIndex"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueCall = go.importObject.env["syscall/js.valueCall"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueGet = go.importObject.env["syscall/js.valueGet"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueNew = go.importObject.env["syscall/js.valueNew"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueSet = go.importObject.env["syscall/js.valueSet"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueSetIndex = go.importObject.env["syscall/js.valueSetIndex"];`)());
          parentPath.insertBefore(template(`const syscall_js_stringVal = go.importObject.env["syscall/js.stringVal"];`)());
          parentPath.insertBefore(template(`const syscall_js_valuePrepareString = go.importObject.env["syscall/js.valuePrepareString"];`)());
          parentPath.insertBefore(template(`const syscall_js_valueLoadString = go.importObject.env["syscall/js.valueLoadString"];`)());

          //Let's also add the go.run() node to initialize our bootstrapped script.
          parentPath.insertAfter(template(`go.run();`)());

        }
      }
    });
  }

  mergeConvertedWasmWithSkeleton(){

    const skeletonCode = recast.print(this.skeletonAst).code;
    const wasmCode = recast.print(this.wasmAst).code;

    return parser(`${skeletonCode} ${wasmCode}`, {sourceType : "script"});

  }

}

BootstrapCommand.description = `Bootstraps a ticket.wasm file into an equivalent stand-alone NodeJS script

Converts a ticket.wasm file into a NodeJS script that can be run independently from the browser. It uses wasm2js to 
initially convert the wasm file into a Javascript file. 

However, the sys calls are not correctly imported 
so this command goes further into making some more additions via modifying the JS AST after the wasm-to-js conversion. It adds some browser's 
properties such as Document, User-Agent, and anything else that ticket.wasm might request.

Note: Supreme's ticket.wasm might start requesting other browser properties, so some of these flag options
might change.

Adding your User-Agent into the bootstrapped script is easy as adding
the --user-agent flag and specifying the custom User-Agent you want.

Note: Not passing a User-Agent will result in using the default User-Agent which is: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"

In addition, you can also pass in the --run-times flag which will limit your bootstrapped script to only run N number of times. 
This is especially good because Supreme's ticket.wasm runs indefinitely and will continue to generate new _ticket values in a never-ending
loop until the script exits.

Passing a static timestamp is also an option if you want your bootstrapped script to start with a desired timestamp.


Example: Loading the wasm through a local file path that contains ticket.wasm

$ ticket bootstrap ticket.wasm ticket.wasm.js


Example: Using a custom User-Agent 

$ ticket bootstrap --user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36" ticket.wasm ticket.wasm.js


Example: Limiting the bootstrapped script to generate a maximum of 5 _ticket cookies

$ ticket bootstrap --run-times=5 ticket.wasm ticket.wasm.js


Example: Passing a static timestamp

$ ticket bootstrap --timestamp=1591993300052 ticket.wasm ticket.wasm.js


To run the bootstrapped file is as simple as:

$ node ticket.wasm.js


`;

BootstrapCommand.flags = {

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
  ),
  'timestamp': flags.string(
    {
      description: "Uses a static timestamp instead of using Date.now() on the bootstrapped script",
      required: false,
      default: 0
    }
  )
};

BootstrapCommand.args = [
  {
    name : 'ticket_file',
    required : true,
    description : 'Ticket.wasm file'
  },
  {
    name : 'bootstrap_file',
    required : true,
    description : 'Output file where to save the newly generated bootstrapped JS ticket.wasm'
  },
];


module.exports = BootstrapCommand;
