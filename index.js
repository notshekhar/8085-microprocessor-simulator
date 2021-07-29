let asm = `
MVI A, 02H;
MVI B, 01H;
ADD B;
`

const Ram = require("./ram")

const ram = new Ram()

ram.set("ffff", 21)
console.log(ram.get("ffff"))
// const Lexer = require("./lexer")

// const lexer = Lexer(asm)

// console.log(lexer.next().value)
