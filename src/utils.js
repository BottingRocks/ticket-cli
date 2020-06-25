
const fs = require("fs");
const parser = require("@babel/parser").parse;


function fromFile(file, sourceType){
  const ast = parser(
    fs
      .readFileSync(file, {
				encoding: "UTF-8"
      })
			.toString()
		,{sourceType : sourceType == "module" ? sourceType : "script"}
  );
  delete ast.comments;
  return ast;
}


function fromString(string, sourceType){
  const ast = parser(string ,{sourceType : sourceType == "module" ? sourceType : "script"});
  delete ast.comments;
  return ast;

}


module.exports = {
  fromFile,
  fromString
};