const RAM = require("../assembled/ram")
const REGS = require("../assembled/regs")

function Instructions() {
    //Move data of Accumulator to memory location
    this.STA = function (location) {
        RAM.set(location, REGS.get("A"))
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
    this.LXI = function (req, memory_location) {
        REGS.setPair(reg, memory_location)
    }
    //Add value of reg to accumulator
    this.ADD = function (reg) {
        REGS.set("A", parseInt(REGS.get("A"), 16) + parseInt(REGS.get(reg), 16))
    }
    //subtract value of reg to accumulator
    this.SUB = function (reg) {
        REGS.set("A", parseInt(REGS.get("A"), 16) - parseInt(REGS.get(reg), 16))
    }
}

module.exports = Instructions
