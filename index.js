const words = ['apple', 'ATEEZ', 'banana', 'boom', 'cucumber', 'commander', 'chk-chk', 'delta', 'demure', 'delicious', 'ecstatic', 'ecosystem', 'eco-round', 'fr', 'fun', 'F', 'function', 'facts', 'gay', 'greasy', 'Gary', 'girlie', 'homo', 'Himalayas', 'hermit', 'haram', 'halal', 'hello', 'hi', 'hippopotomonstrosesquippedaliophobia', 'hippo', 'huge', 'hehe', 'hehehehaw', 'her', 'his', 'him', 'hersheys', 'HALA', 'invoice', 'invitation', 'invoke', 'illegal', 'irregular', 'ingles', 'Instagram', 'jajajaja', 'Joker', 'jizz', 'jazz', 'Jalil', 'joemama', 'jungle', 'kalm', 'KKK', 'key', 'kitten', 'kebab', 'kick', 'kindergarteners', 'kaleidoscopical', 'Li', 'L', 'loser', 'ligma', 'lacking', 'labour', 'labouriousnessess', 'lobotomy', 'lobotomisations', 'my', 'me', 'mad', 'man', 'macaron', 'madman', 'maggot', 'macrolinguistic', 'NCT', 'nidda', 'no', 'Nero', 'nerd', 'nap', 'naan', 'nachos', 'narrow', 'nasty', 'names', 'name', 'naive', 'narcoterrorism', 'oh', 'ofc', 'of', 'oak', 'oath', 'oat', 'oasis', 'oblong', 'object', 'obliviousness', 'omg', 'pp', 'pfp', 'penis', 'play', 'pluck', 'paki', 'PEW PEW PEW', 'packing', 'packs', 't', 'turrents', 'turrets', 's', 'SKZ' , 'p', 'pneumonoultramicroscopicsilicovolcanoconiosis'];
const starts = ['a', 'an', 'and', 'is', 'the', 'of', 'it', 'what'];
const punct = [".", ",", "!", "?", "!?"];
const vowels = ['a', 'e', 'i', 'o', 'u'];
let message = [];
sentence = '';

function randomSize(max = 10, min = 1) {
    return  Math.floor(Math.random() * max) + min;
}

function randomArr(arr) {
    return  Math.floor(Math.random() * arr.length);
}

function randomConnective() {
    return starts[randomArr(starts)];
}

function randomPunct() {
    return punct[randomArr(punct)];
}

function randomWord() {
    return words[randomArr(words)];
}

function makePhrase(num = randomSize()) {
    sentence = (`${randomConnective()} ${makeMessage(num)}${randomPunct()}`);
    //console.log(sentence);
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    return sentence;
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

function grammarCheck() {
    let temp = sentence.split(' ');
    //console.log(temp[1]) // second word
    if (temp[0] === 'A' || temp[0] === 'An'){
        vowels.forEach(vowel => {
            //console.log(temp);
            let firstLetterOfSecondWord = temp[1].charAt(0);
            if (firstLetterOfSecondWord.toLowerCase() === vowel) {
                temp[0] = 'An';
            } else if (firstLetterOfSecondWord.toLowerCase() !== vowel) {
                temp[0] = 'A';
            } else {
                throw Error("Error at grammar check on vowels, what did you do?");
            }
        })
    }
    //console.log(temp)
    return temp.join(" ");
}

console.log(makePhrase());
console.log(grammarCheck())