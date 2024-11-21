const words = ['a', 'an', 'apple', 'ATEEZ', 'banana', 'boom', 'cucumber', 'commander', 'chk-chk', 'delta', 'demure', 'delicious', 'ecstatic', 'ecosystem', 'eco-round', 'fr', 'fun', 'F', 'function', 'facts', 'gay', 'greasy', 'Gary', 'girlie', 'homo', 'Himalayas', 'hermit', 'haram', 'halal', 'hello', 'hi', 'hippopotomonstrosesquippedaliophobia', 'hippo', 'huge', 'hehe', 'hehehehaw', 'her', 'his', 'him', 'hersheys', 'HALA', 'invoice', 'invitation', 'invoke', 'illegal', 'irregular', 'ingles', 'Instagram', 'jajajaja', 'Joker', 'jizz', 'jazz', 'Jalil', 'joemama', 'jungle', 'kalm', 'KKK', 'key', 'kitten', 'kebab', 'kick', 'kindergarteners', 'kaleidoscopical', 'Li', 'L', 'loser', 'ligma', 'lacking', 'labour', 'labouriousnessess', 'lobotomy', 'lobotomisations', 'my', 'me', 'mad', 'man', 'macaron', 'madman', 'maggot', 'macrolinguistic', 'NCT', 'nidda', 'no', 'Nero', 'nerd', 'nap', 'naan', 'nachos', 'narrow', 'nasty', 'names', 'name', 'naive', 'narcoterrorism', 'oh', 'ofc', 'of', 'oak', 'oath', 'oat', 'oasis', 'oblong', 'object', 'obliviousness', 'omg', /*p*/ 'pfp', 'penis', 'play', 'pluck', 'paki', 'PEW PEW PEW', 'packing', 'packs', /*t*/ 'turrents', 'turrets', /*s*/, 'SKZ' , /*p*/, 'pneumonoultramicroscopicsilicovolcanoconiosis'];
const starts = ['a', 'an', 'and', 'is', 'the', 'of', 'it', 'what'];
const punct = [".", ",", "!", "?", "!?"];
const vowels = ['a', 'e', 'i', 'o', 'u'];
let message = [];
const savedMixedMessages = [];
sentence = '';

const paragraph = document.getElementById('mixMessageInput');
const savedMessageField = document.getElementById('savedMessages');
const saveButton = document.getElementById('saveMessage');

function updateHTML() {
    paragraph.textContent = sentence;
}

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
    updateHTML();
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
    let i = 0;
    //console.log(temp[1]) // second word
    temp.forEach((word) => {
        //console.log(`words in sentence: ${word}`)
        if (word === 'A' || word === 'An')
        {
            console.log(`A or An at index ${i}`)
            vowels.forEach(vowel => {
                //console.log(temp);
                let firstLetterOfSecondWord = temp[i + 1].charAt(0);
                //console.log(`first letter of 2nd word: ${firstLetterOfSecondWord}`);
                if (firstLetterOfSecondWord.toLowerCase() === vowel) {
                    temp[i] = 'An';
                    //console.log(`The letter is a vowel!`);
                } else if (firstLetterOfSecondWord.toLowerCase() !== vowel) {
                    temp[i] = 'A';
                    //console.log(`The letter is not a vowel.`);
                } else {
                    throw Error("Error at grammar check on vowels, what did you do?");
                }
            })
        }
        i++;
    })
    //console.log(temp)
    sentence = temp.join(" ");
    updateHTML();
    return sentence;
}

function retrieveSaved() {
    if (localStorage.getItem('mixed')) {
        let arr = localStorage.getItem('mixed');
        arr.forEach(part => {
            savedMessageField.textContent += part;
        })
    }
}

function saveMessages() {
    if (savedMixedMessages) {
        savedMixedMessages.forEach(savedMessage => {
            if (savedMessage === sentence) {
                return 'It already exists';
            } else {
                savedMixedMessages.push(sentence);
            }
        })
    }
    localStorage.removeItem('mixed');
    localStorage.setItem('mixed', savedMixedMessages);
}

saveButton.addEventListener('click', saveMessages());

console.log(makePhrase());
console.log(grammarCheck())