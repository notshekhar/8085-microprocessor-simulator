// ---....---

const ram = require("../components/ram")
const regs = require("../components/registers")
const INST = require("../assembler/instructions")
const { B, A, D, H, M } = require("../config")

function sub_instruction_test(a, b) {
    INST.MVI(A, a)
    INST.MVI(B, b)
    INST.SUB(B)
    return regs.get(A)
}
function add_instruction_test(a, b) {
    INST.MVI(A, a)
    INST.MVI(B, b)
    INST.ADD(B)
    return regs.get(A)
}

function sui_test(val) {
    INST.MVI(A, "20")
    INST.SUI(val)
    return regs.get(A)
}

function xchg_test() {
    INST.LXI(H, "2000")
    INST.LXI(D, "2002")
    INST.XCHG()
    return [regs.getPair(H), regs.getPair(D)]
}

test("ADD Test", () => {
    let inputs = [
        ["20", "20"],
        [10, 1],
        ["ff", 1],
    ]
    let outputs = [0x40, 0x0b, 0x00]
    for (let i = 0; i < inputs.length; i++) {
        expect(add_instruction_test(inputs[i][0], inputs[i][1])).toBe(
            outputs[i]
        )
    }
})

test("SUI Test", () => {
    let inputs = ["20", "00", "ff"]
    let outputs = [0x00, 0x20, 0xdf]
    for (let i = 0; i < inputs.length; i++) {
        expect(sui_test(inputs[i])).toBe(outputs[i])
    }
})

test("XCHG test", () => {
    expect(xchg_test()).toEqual([0x2002, 0x2000])
})

function inr_test(reg) {
    INST.INR(reg)
    return regs.get(reg)
}

test("INR Test", () => {
    let inputs = [A, B, M]
    INST.MVI(A, 0x00)
    INST.MVI(B, 0xff)
    INST.MVI(M, 0x00)
    let outputs = [0x01, 0x00, 0x01]
    for (let i = 0; i < inputs.length; i++) {
        expect(inr_test(inputs[i])).toBe(outputs[i])
    }
})
