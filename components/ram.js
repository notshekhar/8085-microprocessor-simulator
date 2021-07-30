require("colors")

function Memory(capacity) {
    this.memory = new Uint8Array(
        typeof capacity == "number"
            ? capacity
            : parseInt(capacity, 16) + 1 || 65536
    ).fill(0)
}

module.exports = function Ram(capacity) {
    const memory = new Memory(capacity)
    this.set = function (location, value = 0) {
        if (typeof value != "number" && parseInt(value, 16) > 255) return
        if (typeof value == "number" && value > 255) return

        memory.memory[parseInt(location, 16)] =
            typeof value == "number" ? value : parseInt(value, 16)
    }
    this.get = function (location) {
        return memory.memory[parseInt(location, 16)].toString(16).blue
    }
}
