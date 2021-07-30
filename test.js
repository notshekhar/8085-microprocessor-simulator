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

const inst = require("./assembler/instructions")
const { A, B, M, F } = require("./config")

const INST = new inst()

INST.MVI(A, 8)
INST.MVI(B, 8)
INST.ADD(B)
console.log(registers.get(A))
INST.STA("2000")
INST.MVI(M, 8)
console.log(ram.get("2000"))
INST.LXI(B, "2100")
INST.ADC(B)

console.log(A, registers.get(A))
console.log(F, registers.get(F))
