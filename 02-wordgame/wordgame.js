let json;
const body = document.body;
let guessedWords = new Set(); // To track previously guessed words

// Returns a random integer between min and max
//   [min, min+1, min+2, ... , max-1, max]
function randInt(min, max) {
    let rand = Math.random();
    rand = rand * (max - min + 1);
    rand = rand + min;
    rand = Math.floor(rand);
    return rand;
}

function loadGame() {
    fetch('./words_dictionary.json')
        .then(response => response.text())
        .then(text => {
            // Split the text by lines to get individual words
            json = JSON.parse(text);
            console.log('Words loaded!');
            wordsLoaded();
        })
        .catch(error => {
            console.error('Error fetching words: ', error);
        });
    body.style.backgroundColor = "lightblue";
}

function wordsLoaded() {
    let allWords = Object.keys(json);
    let randomIndex = randInt(0, allWords.length - 1);

    for (let i = 0; i < allWords.length; i++) {
        let word = allWords[i];
        if (word.length != 5) continue;
        fiveLetterWords.push(allWords[i]);
    }

    randomIndex = randInt(0, fiveLetterWords.length - 1);
    secret = fiveLetterWords[randomIndex].toLowerCase();
}

function changeGuess() {
    let guess = guessField.value.toLowerCase();
    
    // SKIP if it's less than 5 letters
    if (guess.length < 5) {
        randomWord.innerHTML = "Enter a 5-letter word.";
        return;
    }

    // SKIP and empty input if guess is more than 5 letters
    if (guess.length > 5) {
        randomWord.innerHTML = "Enter a 5-letter word.";
        guessField.value = "";
        return;
    }

    // Check if the guess is a valid word
    if (!json.hasOwnProperty(guess)) {
        randomWord.innerHTML = `<span>"${guess}" is not a real word. Try again.</span>`;
        guessField.value = "";
        return;
    }

    // Check if the word has been guessed already
    if (guessedWords.has(guess)) {
        randomWord.innerHTML = `"${guess}" has already been guessed. Try a different word.`;
        guessField.value = "";
        return;
    }

    // Add the word to the set of guessed words
    guessedWords.add(guess);

    console.log(`Guess: "${guess}" and Secret: "${secret}"`);

    let correctPlacement = 0;
    let decoratedGuess = [];
    let secretLetters = secret.split('');
    let guessLetters = guess.split('');
    let matchedIndices = new Set();

    // Create a container for the current guess row
    let row = document.createElement('div');
    row.classList.add('word-row');

    // First pass: Check for correct placements
    for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === secretLetters[i]) {
            correctPlacement++;
            decoratedGuess.push(`<span class="letter-box correct">${guessLetters[i]}</span>`);
            matchedIndices.add(i);
            secretLetters[i] = null; // Remove the letter from consideration in the second pass
        } else {
            decoratedGuess.push(`<span class="letter-box">${guessLetters[i]}</span>`);
        }
    }

    // Second pass: Check for correct letters in the wrong position
    for (let i = 0; i < 5; i++) {
        if (!matchedIndices.has(i) && secretLetters.includes(guessLetters[i])) {
            let index = secretLetters.indexOf(guessLetters[i]);
            decoratedGuess[i] = `<span class="letter-box wrong-position">${guessLetters[i]}</span>`;
            secretLetters[index] = null; // Remove the letter from further consideration
        }
    }

    // Convert the array back to a string
    decoratedGuess = decoratedGuess.join('');

    // Append the row to the feedback text container
    row.innerHTML = decoratedGuess;
    feedbackText.appendChild(row);

    guessField.value = "";
    if (correctPlacement == 5) {
        alert("you win");
    }
}

// Initialize the elements for the game
const randomWord = document.getElementById("random-word");
const guessField = document.getElementById("guess-field");
const feedbackText = document.getElementById("feedback-text");
let allWords = [];
let fiveLetterWords = [];
let secret = '';
