let asm = `
MVI A, 02H;
MVI B, 01H;
ADD B;
`

const ram = require("./assembled/ram")
const registers = require("./assembled/regs")

ram.set("2000", 21)
registers.setPair("H", "2000")
console.log(registers.get("M"), registers.getPair("H"))
