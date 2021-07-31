const RAM = require("../components/ram")
const REGS = require("../components/registers")

const { A, AC, CY, H } = require("../config")

function Instructions() {
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
        let sum = parseInt(REGS.get(A), 16) + parseInt(REGS.get(reg), 16)
        sum = sum.toString(16)
        sum = sum.length > 2 ? sum.slice(1) : sum
        sum = parseInt(sum, 16)
        REGS.set(A, sum)
    }
    //subtract value of reg to accumulator
    this.SUB = function (reg) {
        REGS.set(A, parseInt(REGS.get(A), 16) - parseInt(REGS.get(reg), 16))
    }
    this.ADC = function (reg) {
        let sum = parseInt(REGS.get(A), 16) + parseInt(REGS.get(reg), 16)
        if (sum > 255) {
            REGS.setFlag(CY)
        }
        sum = sum.toString(16)
        sum = sum.length > 2 ? sum.slice(1) : sum
        sum = parseInt(sum, 16)
        if (sum > 15) {
            REGS.setFlag(AC)
        }
        REGS.set(A, sum)
    }
    this.ADI = function (value) {
        let sum = parseInt(REGS.get(A), 16) + value
        sum = sum.toString(16)
        sum = sum.length > 2 ? sum.slice(1) : sum
        sum = parseInt(sum, 16)
        REGS.set(A, sum)
    }
    this.ACI = function (value) {
        let sum = parseInt(REGS.get(A), 16) + value
        if (sum > 255) {
            REGS.setFlag(CY)
        }
        sum = sum.toString(16)
        sum = sum.length > 2 ? sum.slice(1) : sum
        sum = parseInt(sum, 16)
        if (sum > 15) {
            REGS.setFlag(AC)
        }
        REGS.set(A, sum)
    }
    this.DAD = function (regpair) {
        let value = REGS.getPair(regpair)
        let sum = parseInt(REGS.getPair(H), 16) + parseInt(value, 16)
        if (sum > 65535) sum = sum.toString(16).slice(1)
        else sum = sum.toString(16)

        REGS.setPair(H, sum)
    }
}

module.exports = new Instructions()
