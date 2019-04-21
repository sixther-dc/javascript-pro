const recast = require("recast");

const code = `
    function add(a,b){
        return a+b
    }
`

const ast = recast.parse(code);
const add = ast.program.body[0];
console.log(add);