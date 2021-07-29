function Token(value, type) {
    this.value = value
    this.type = type
}

function* Lexer(text) {
    let counter = 0
    let len = text.length
    while (counter != len) {
        let ch = text[counter]
        if (match(ch, /\w/)) {
            let token = ""
            while (!isNextToken(ch)) {
                token += ch

                counter += 1
                ch = text[counter]
            }
            yield new Token(token, token_type(token))
            counter += 1
        }
    }
}

let keywords = ["MVI", "ADD", "SUB"]
let register = ["A", "B", "C", "D", "E", "F", "H", "L"]

function token_type(token) {
    if (keywords.includes(token)) return "keyword"
    if (register.includes(token)) return "register"
    else return "false"
}

function isNextToken(ch) {
    return match(ch, /\t|\n|\s/)
}

function match(word, regex) {
    return regex.test(word)
}

module.exports = Lexer
