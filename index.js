const words = ['a', 'an', 'apple', 'ATEEZ', 'banana', 'boom', 'cucumber', 'commander', 'chk-chk', 'delta', 'demure', 'delicious', 'ecstatic', 'ecosystem', 'eco-round', 'fr', 'fun', 'F', 'function', 'facts', 'gay', 'greasy', 'Gary', 'girlie', 'homo', 'Himalayas', 'hermit', 'haram', 'halal', 'hello', 'hi', 'hippopotomonstrosesquippedaliophobia', 'hippo', 'huge', 'hehe', 'hehehehaw', 'her', 'his', 'him', 'hersheys', 'HALA', 'invoice', 'invitation', 'invoke', 'illegal', 'irregular', 'ingles', 'Instagram', 'jajajaja', 'Joker', 'jizz', 'jazz', 'Jalil', 'joemama', 'jungle', 'kalm', 'KKK', 'key', 'kitten', 'kebab', 'kick', 'kindergarteners', 'kaleidoscopical', 'Li', 'L', 'loser', 'ligma', 'lacking', 'labour', 'labouriousnessess', 'lobotomy', 'lobotomisations', 'my', 'me', 'mad', 'man', 'macaron', 'madman', 'maggot', 'macrolinguistic', 'NCT', 'nidda', 'no', 'Nero', 'nerd', 'nap', 'naan', 'nachos', 'narrow', 'nasty', 'names', 'name', 'naive', 'narcoterrorism', 'oh', 'ofc', 'of', 'oak', 'oath', 'oat', 'oasis', 'oblong', 'object', 'obliviousness', 'omg', /*p*/ 'pfp', 'penis', 'play', 'pluck', 'paki', 'PEW PEW PEW', 'packing', 'packs', /*t*/ 'turrents', 'turrets', /*s*/, 'SKZ' , /*p*/, 'pneumonoultramicroscopicsilicovolcanoconiosis'];
const starts = ['a', 'an', 'and', 'is', 'the', 'of', 'it', 'what'];
const punct = [".", ",", "!", "?", "!?"];
const vowels = ['a', 'e', 'i', 'o', 'u'];
let message = [];
let savedMixedMessages = [];
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

//browser functionality down there

function retrieveSaved() {
    console.log('retrieveSaved() is invoked');

    savedMixedMessages = [JSON.parse(localStorage.getItem('mixed'))] || [];
    
    if (!Array.isArray(savedMixedMessages)) {
        console.warn('Invalid data in localStorage, resetting to an empty array.');
        savedMixedMessages = [];
    }

    savedMixedMessages.forEach(part => {
        console.log(part);
        savedMessageField.textContent += part;
    })
}

function saveMessages() {
    console.log('saveMessages() is invoked');
    if (!sentence) {
        console.log('No sentence to save');
        return;
    }
    if (savedMixedMessages.length > 0) {
        console.log('Mixed messages exist locally');
        
        // Check for duplicates
        if (savedMixedMessages.includes(sentence)) {
            console.log('It already exists');
            return 'It already exists';
        } else {
            console.log('Sentence added!');
            savedMixedMessages.push(sentence);
        }
    } else {
        console.log('First sentence added!');
        savedMixedMessages.push(sentence);
        console.log(savedMixedMessages);
    }

    // Save updated messages to localStorage
    localStorage.setItem('mixed', JSON.stringify(savedMixedMessages));
    retrieveSaved();
}


console.log(makePhrase());
console.log(grammarCheck());

saveButton.addEventListener('click', saveMessages);
retrieveSaved();