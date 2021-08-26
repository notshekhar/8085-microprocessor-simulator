// ---....---

const ram = require("../components/ram")
const regs = require("../components/registers")
const P = require("../components/processor")
const { B, A, D, H, M } = require("../config")

function sub_instruction_test(a, b) {
    P.MVI(A, a)
    P.MVI(B, b)
    P.SUB(B)
    return regs.get(A)
}
function add_instruction_test(a, b) {
    P.MVI(A, a)
    P.MVI(B, b)
    P.ADD(B)
    return regs.get(A)
}

function sui_test(val) {
    P.MVI(A, "20")
    P.SUI(val)
    return regs.get(A)
}

function xchg_test() {
    P.LXI(H, "2000")
    P.LXI(D, "2002")
    P.XCHG()
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
    P.INR(reg)
    return regs.get(reg)
}

test("INR Test", () => {
    let inputs = [A, B, M]
    P.MVI(A, 0x00)
    P.MVI(B, 0xff)
    P.MVI(M, 0x00)
    let outputs = [0x01, 0x00, 0x01]
    for (let i = 0; i < inputs.length; i++) {
        expect(inr_test(inputs[i])).toBe(outputs[i])
    }
})

function inx_test(reg_pair) {
    P.INX(reg_pair)
    return regs.getPair(reg_pair)
}

test("INX Test", () => {
    P.LXI(H, 0x2000)
    P.LXI(B, 0x200)
    P.LXI(D, 0xffff)

    let inputs = [H, B, D]
    let outputs = [0x2001, 0x201, 0x0000]

    for (let i = 0; i < inputs.length; i++) {
        expect(inx_test(inputs[i])).toBe(outputs[i])
    }
})

function dcr_test(reg) {
    P.DCR(reg)
    return regs.get(reg)
}

test("DCR Test", () => {
    P.MVI(A, 0x20)
    P.MVI(B, 0x00)
    P.MVI(M, 0x01)
    let inputs = [A, B, M]
    let outputs = [0x1f, 0x01, 0x00]

    for (let i = 0; i < inputs.length; i++) {
        expect(dcr_test(inputs[i])).toBe(outputs[i])
    }
})
