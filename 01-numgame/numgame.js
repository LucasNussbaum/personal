// GUIDELINES:
//  1. Give every variable/const smallest scope
//  2. Grab HTML elements by tag and store in const
//  3. Put all other code inside functions
const numField = document.getElementById("num-field")
const messageText = document.getElementById("message-text")
const triesNumber = document.getElementById("tries")
const body = document.body;
const one = document.getElementById("1")
const two = document.getElementById("2")
const three = document.getElementById("3")
const four = document.getElementById("4")
const reset = document.getElementById("reset")
let remainingTries = 10
let secret;
let min = 1;
let max = 100;


var myConfetti = confetti.create(null, {
    resize: true,
    useWorker: true
});

function loadGame() {
    numField.min = min
    reset.style.visibility = 'hidden' 
    numField.max = max
    document.body.style.backgroundColor = "orange";
    secret = Math.random()
    secret *= (max-min+1)
    secret += min
    secret = Math.floor(secret)  //TODO: MAKE THE NUMBER RANDOM
}

function makeGuess(){
    let guess = parseInt(numField.value)
    console.log(`Guess: ${guess}`)
    if(guess > secret){
        messageText.innerHTML = `${guess} is too high`
        remainingTries -=1
        if(remainingTries == 0 ){
            endGame()
            document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/05/29/76/16/360_F_529761687_w6ZgCR7oJ8iyoPofo8hPikOw6EM9cp4m.jpg')"
            
        
                document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/05/29/76/16/360_F_529761687_w6ZgCR7oJ8iyoPofo8hPikOw6EM9cp4m.jpg')"
            
                alert("you lose")
            }
        triesNumber.innerHTML = `: ${remainingTries}`
    }
    else if(guess < secret){
        messageText.innerHTML = `${guess} is too low`
        remainingTries -=1
        if(remainingTries == 0 ){
            endGame() 
         
        
            document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/05/29/76/16/360_F_529761687_w6ZgCR7oJ8iyoPofo8hPikOw6EM9cp4m.jpg')";
            alert("you lose")
        }
        triesNumber.innerHTML = `: ${remainingTries}`
    }
    else if(guess == secret){
        messageText.innerHTML = `${guess} is correct`
        myConfetti({particlecount: 500, spread: 160})
        endGame()
        
        
    triesNumber.innerHTML = `: ${remainingTries}`
    document.body.style.backgroundImage = "url('https://t3.ftcdn.net/jpg/03/14/56/66/240_F_314566645_UNHlYyGK2EVdGQ8MoNw95vvH44yknrc7.jpg')";
    alert("you win")
    }
   
}       


function resetGame(){
    secret = Math.random()
    secret *= (max-min+1)
    secret += min
    secret = Math.floor(secret)
    remainingTries = 10
    numField.style.visibility = 'visible'
    messageText.style.visibility = 'visible'
    triesNumber.style.visibility = 'visible'
    body.style.visibility = 'visible'
    one.style.visibility = 'visible'
    two.style.visibility = 'visible'
    three.style.visibility = 'visible'
    four.style.visibility = 'visible'
    document.body.style.backgroundImage = ""
    document.body.style.backgroundColor = "orange"
    triesNumber.innerHTML = `: ${remainingTries}`

}

function endGame(){
    numField.style.visibility = 'hidden'
    messageText.style.visibility = 'hidden'
    triesNumber.style.visibility = 'hidden'
    body.style.visibility = 'hidden'
    one.style.visibility = 'hidden'
    two.style.visibility = 'hidden'
    three.style.visibility = 'hidden'
    four.style.visibility = 'hidden'
    reset.style.visibility = 'visible'

}