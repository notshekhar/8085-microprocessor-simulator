// ---....---

let asm = `
MVI A, 02H;
MVI B, 01H;
ADD B;
`

const ram = require("./components/ram")
const regs = require("./components/registers")
const INST = require("./assembler/instructions")
const { B, A } = require("./config")

function test(...functions) {
    functions.forEach((func, i) => {
        let t = func(i)
        console.log(`\nTest ${i} Done\n`)
    })
}

function RamValueSet(n) {
    let inputs = [1, "1", "21", 21, 256]
    let outputs = ["1", "1", "21", "15", "0"]
    for (let i = 0; i < inputs.length; i++) {
        ram.set("2000", 0)
        ram.set("2000", inputs[i])
        let out = ram.get("2000")
        if (out != outputs[i]) {
            console.log(
                "failed at input: ",
                inputs[i],
                "output:",
                out,
                "expected:",
                outputs[i]
            )
        } else {
            console.log(
                `Test ${n}${i} passed, input: ${inputs[i]}, output: ${outputs[i]}`
            )
        }
    }
    // console.log("test pass", this)
}

function sub_instruction_test(n) {
    let inputs = [
        ["00", "ff"],
        ["02", "01"],
        ["00", "100"],
    ]
    let outputs = ["ff", "1", "0"]
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i]
        INST.MVI(A, input[0])
        INST.MVI(B, input[1])
        INST.SUB(B)
        let o = regs.get(A)
        if (o != outputs[i]) {
            console.log(
                "Test Failed at",
                input,
                "expected",
                outputs[i],
                "output",
                o
            )
        } else {
            console.log(
                `Test ${n}${i} passed, input: ${input}, output: ${outputs[i]}`
            )
        }
    }
}

test(RamValueSet, sub_instruction_test)
