const RAM = require("../assembled/ram")

function Regs() {
    this.A = "00" //8-bit
    this.B = "00" //8-bit
    this.C = "00" //8-bit
    this.D = "00" //8-bit
    this.E = "00" //8-bit
    this.F = "00" //8-bit
    this.H = "00" //8-bit
    this.L = "00" //8-bit
    this.P = "00" //8-bit
    this.C = "00" //8-bit
    this._M = "00"
    this.pairs = {
        H: [this.H, this.L], //memory pointer
        B: [this.B, this.C],
        D: [this.D, this.E],
        PC: [this.P, this.C], //program counter
    }
    this.setPair = function (reg, value) {
        let firstHalf = value.slice(0, 2)
        let secondHalf = value.slice(2)
        this.pairs[reg][0] = firstHalf
        this.pairs[reg][1], secondHalf
    }
    this.getPair = function (r) {
        return this.pairs[r][0] + this.pairs[r][1]
    }
}

Object.defineProperty(Regs.prototype, "M", {
    get: function () {
        return RAM.get(this.getPair("H"))
    },
    set: function (value) {
        this._M = value
    },
})
module.exports = function Registers() {
    const regs = new Regs()
    this.set = function (registor, value) {
        if (typeof value != "number" && parseInt(value, 16) > 255) return
        if (typeof value == "number" && value > 255) return

        regs[registor] = typeof value == "number" ? value : parseInt(value, 16)
    }
    this.get = function (registor) {
        return regs[registor].toString(16).red
    }
    this.getPair = function (reg) {
        return regs.getPair(reg)
    }
    this.setPair = function (reg, value) {
        regs.setPair(reg, value)
    }
}
