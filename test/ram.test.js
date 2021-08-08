const RAM = require("../components/ram")

function set_value_test(location, val) {
    RAM.set(location, val)
    return RAM.get(location)
}

test("ram testing", () => {
    let inputs = [
        ["2000", "20"],
        ["2001", 255],
        ["2000", 10],
        ["2002", 256],
    ]
    let outputs = [0x20, 0xff, 0x0a, 0x00]
    for (let i = 0; i < inputs.length; i++) {
        expect(set_value_test(inputs[i][0], inputs[i][1])).toBe(outputs[i])
    }
})
