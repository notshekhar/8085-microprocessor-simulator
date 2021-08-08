// ---....---

require("colors")

function Memory(capacity) {
    this.memory = new Uint8Array(
        typeof capacity == "number"
            ? capacity
            : parseInt(capacity, 16) + 1 || 0xffff
    ).fill(0)
}

function Ram(capacity) {
    const memory = new Memory(capacity)
    this.set = function (location, value = 0) {
        if (typeof value != "number") value = parseInt(value, 16)
        value %= 0x100
        memory.memory[parseInt(location, 16)] = value
    }
    this.get = function (location) {
        return memory.memory[parseInt(location, 16)]
    }
}

module.exports = new Ram()
