const words = ['apple', 'ATEEZ', 'banana', 'boom', 'cucumber', 'commander', 'chk-chk', 'delta', 'demure', 'delicious', 'ecstatic', 'ecosystem', 'eco-round', ''];
const connectives = ['a', 'an', 'is', 'the', 'of'];
const punct = [".", ",", "!", "?", "!?"];
let message = [];

function randomArr(arr) {
    return  Math.floor(Math.random() * arr.length)
}

function randomConnective() {
    return connectives[randomArr(connectives)]
}

function randomPunct() {
    return punct[randomArr(punct)];
}

function randomWord() {
    return words[randomArr(words)];
}

function makePhrase(num = Math.floor(Math.random() * 10)) {
    return (`${randomConnective()} ${makeMessage(num)} ${randomPunct()}`);
}

function makeMessage(count) {
    while(message.length < count) {
        let word = randomWord();
        if (message.indexOf(word) === -1) {
            message.push(word);
        }
    }
    return message.join(" ");
}

console.log(makePhrase());