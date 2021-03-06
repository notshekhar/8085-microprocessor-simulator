// ---....---

const RAM = require("./ram")
const REGS = require("./registers")

const { A, AC, CY, H, B, D } = require("../config")
const { dec2bcd } = require("./functions")

function Processor() {
    //Move data of Accumulator to memory location
    this.STA = function (location) {
        RAM.set(location, REGS.get(A))
    }
    //Move Imediate data to registers
    this.MVI = function (reg, value) {
        REGS.set(reg, value)
    }
    //Move value of reg2 to reg1
    this.MOV = function (reg1, reg2) {
        REGS.set(reg1, REGS.get(reg2))
    }
    //Set reg pair to 16-bit data(memory location)
    this.LXI = function (reg, memory_location) {
        REGS.setPair(reg, memory_location)
    }
    //Add value of reg to accumulator
    this.ADD = function (reg) {
        let sum = REGS.get(A) + REGS.get(reg)
        REGS.set(A, sum)
    }

    this.ADC = function (reg) {
        let sum = REGS.get(A) + REGS.get(reg)
        if (sum > 0xff) REGS.setFlag(CY)
        sum %= 0x100
        if (sum > 15) REGS.setFlag(AC)
        REGS.set(A, sum)
    }
    this.ADI = function (value) {
        let sum = REGS.get(A) + value
        REGS.set(A, sum)
    }
    this.ACI = function (value) {
        let sum = REGS.get(A) + value
        if (sum > 0xff) REGS.setFlag(CY)
        sum %= 0x100
        if (sum > 0xf) REGS.setFlag(AC)
        REGS.set(A, sum)
    }
    this.DAD = function (regpair) {
        let value = REGS.getPair(regpair)
        let sum = REGS.getPair(H) + value
        sum %= 0x10000
        sum = sum.toString(16)
        REGS.setPair(H, sum)
    }
    //subtract value of reg to accumulator
    this.SUB = function (reg) {
        let sub = REGS.get(A) - REGS.get(reg)
        sub = Math.abs(sub)
        REGS.set(A, sub)
    }
    this.SBB = function (reg) {
        let sub = REGS.get(A) - REGS.get(reg)
        if (sub < 0) REGS.setFlag(B)

        sub = Math.abs(sub)
        REGS.set(A, sub)
    }
    this.SUI = function (val) {
        if (typeof val != "number") val = parseInt(val, 16)
        val %= 0x100
        let sub = REGS.get(A) - val
        if (sub < 0) REGS.setFlag(B)
        sub = Math.abs(sub)
        REGS.set(A, sub)
    }
    this.XCHG = function () {
        let temp = REGS.getPair(H)
        REGS.setPair(H, REGS.getPair(D))
        REGS.setPair(D, temp)
    }
    this.INR = function (reg) {
        let val = REGS.get(reg)
        val += 1
        REGS.set(reg, val)
    }
    this.INX = function (reg_pair) {
        let val = REGS.getPair(reg_pair)
        val += 1
        REGS.setPair(reg_pair, val)
    }
    this.DCR = function (reg) {
        let val = REGS.get(reg)
        val -= 1
        REGS.set(reg, val)
    }
    this.DCX = function (r_pair) {
        let val = REGS.getPair(r_pair)
        val -= 1
        REGS.setPair(r_pair, val)
    }
    this.DAA = function () {
        let val = REGS.get(A)
        val = dec2bcd(val)
        REGS.set(A, val)
    }
}

module.exports = new Processor()

//___....___
