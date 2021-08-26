//---....---

function dec2bcd(number) {
    return parseInt(number.toString(10), 16)
}
function bcd2dec(number) {
    return parseInt(number.toString(16), 10)
}

module.exports = {
    dec2bcd,
    bcd2dec,
}
