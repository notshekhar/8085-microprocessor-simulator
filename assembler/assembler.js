function Token(value, type) {
    this.value = value
    this.type = type
}

function* Tokenizer(text) {
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
            if (ch == ";") {
                yield new Token(";", "END")
            }
        }
        counter += 1
    }
}

let keywords = ["MVI", "ADD", "SUB"]
let register = ["A", "B", "C", "D", "E", "F", "H", "L"]
const opcodes =
    /^(call|[crj](c|nc|z|nz|p|m|pe|po)|ret|rst|in[xr]?|out|lxi|push|pop|stax?|ldax?|xchg|(xt|sp|pc)hl|dad|mov|hlt|mvi|dc[rx]|ad[dci]|su[bi]|sb[bi]|an[di]|[xo]r[ai]|cmp|aci|cpi|rlc|rrc|ral|rar|jmp|cm[ac]|stc|daa|[sl]hld|[rs]im|[ed]i|nop|db|dw|ds)\b/i

const variables = /^(a|bc?|c|de?|e|hl?|l|psw|sp)\b/i
const numbers = /^([\da-f]+h|[0-7]+o|[01]+b|\d+d?)\b/i
const label = /^[?@a-z][a-zA-Z0-9]{0,5}:\b/i

function token_type(token) {
    if (keywords.includes(token)) return "KEYWORD"
    if (register.includes(token)) return "REG"
    else return "false"
}

function isNextToken(ch) {
    return match(ch, /\t|\n|\s|\;|\,/)
}

function match(word, regex) {
    return regex.test(word)
}

module.exports = Tokenizer
