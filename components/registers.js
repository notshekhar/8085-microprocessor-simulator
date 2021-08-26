// ---....---

const RAM = require("./ram")
const { H, M, F } = require("../config")

function Regs() {
    const setflags = {
        CY: 1,
        P: 4,
        AC: 16,
        Z: 64,
        S: 128,
    }
    const resetflags = {
        CY: 254,
        P: 251,
        AC: 239,
        Z: 191,
        S: 127,
    }
    this.A = 0 //8-bit
    this.B = 0 //8-bit
    this.C = 0 //8-bit
    this.D = 0 //8-bit
    this.E = 0 //8-bit
    this._F = [false, false, false, false, false, false, false, false]
    // this.F = 0 //8-bit
    this.H = 0 //8-bit
    this.L = 0 //8-bit
    this.P = 0 //8-bit
    this.C = 0 //8-bit
    this.pairs = {
        H: [this.H, this.L], //memory pointer
        B: [this.B, this.C],
        D: [this.D, this.E],
        PC: [this.P, this.C], //program counter
    }
    this.setPair = function (reg, value) {
        if (typeof value != "number") value = parseInt(value, 16)
        value %= 0x10000
        value = Math.abs(value)
        let firstHalf = parseInt(value / 0x100)
        let secondHalf = value % 0x100
        this.pairs[reg][0] = firstHalf
        this.pairs[reg][1] = secondHalf
    }
    this.getPair = function (r) {
        // return this.pairs[r][0] + this.pairs[r][1]
        return this.pairs[r][0] * 0x100 + this.pairs[r][1]
    }
    this.getFlag = function (f) {
        return this.F
    }
    this.setFlag = function (f) {
        this.F = this.F | setflags[f]
    }
    this.resetFlag = function (f) {
        this.F = this.F & resetflags[f]
    }
}

Object.defineProperty(Regs.prototype, M, {
    get: function () {
        return RAM.get(this.getPair(H))
    },
    set: function (value) {
        RAM.set(this.getPair(H), value)
    },
})

Object.defineProperty(Regs.prototype, F, {
    get: function () {
        let val = parseInt(this._F.map((e) => (e ? 1 : 0)).join(""), 2)
        return val
    },
    set: function (value) {
        let binary = value.toString(2)
        let diff = this._F.length - binary.length
        for (let i = 0; i < binary.length; i++) {
            if (binary[i] == "1") {
                this._F[i + diff] = 1
            }
        }
    },
})

function Registers() {
    const regs = new Regs()
    this.set = function (registor, value) {
        if (typeof value != "number") value = parseInt(value, 16)
        value %= 0x100
        regs[registor] = Math.abs(value)
    }
    this.get = function (registor) {
        return regs[registor]
    }
    this.getPair = function (reg) {
        return regs.getPair(reg)
    }
    this.setPair = function (reg, value) {
        regs.setPair(reg, value)
    }
    this.setFlag = function (flag_name) {
        regs.setFlag(flag_name)
    }
    this.resetFlag = function (flag) {
        regs.resetFlag(flag)
    }
    this.getFlag = function (f) {
        return regs.getFlag(f)
    }
}

module.exports = new Registers()
