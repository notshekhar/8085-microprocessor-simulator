let asm = `
MVI A, 02H;
MVI B, 01H;
ADD B;
`

const ram = require("./components/ram")
const regs = require("./components/registers")
const INST = require("./assembler/instructions")

function test(...functions) {
    functions.forEach((func) => {
        func()
    })
}

function RamValueSet() {
    
}

test(RamValueSet)

ram.set("2000", 21)
regs.setPair("H", "2000")
console.log(regs.get("M"), regs.getPair("H"))

const { A, B, M, F, H } = require("./config")

INST.MVI(A, 8)
INST.MVI(B, 8)
INST.ADD(B)
console.log(regs.get(A))
INST.STA("2000")
INST.MVI(M, 8)
console.log(ram.get("2000"))
INST.LXI(B, "2100")
INST.ADC(B)

INST.DAD(B)
console.log("HL", regs.getPair(H))
console.log(A, regs.get(A))
console.log(F, regs.get(F))
