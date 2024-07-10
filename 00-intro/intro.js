// This is the JavaScript code
// GUIDELINES:
//  1. Give every variable/const smallest scope
//  2. Grab HTML elements by tag and store in const
//  3. Put all other code inside functions

const colorField = document.getElementById("color-field");
const fontSizeField = document.getElementById("font-size-field");
const clickButton = document.getElementById("click-button");
const text = document.getElementById("text");
const body = document.body;
const checkbox = document.getElementById("checkbox")
const animationButton = document.getElementById("animation-button")
const robot= document.getElementById("robot")
function buttonPress(){
    text.innerHTML = "you pressed the button";

    body.style.backgroundColor = colorField.value;
    text.style.fontSize = `${fontSizeField.value}px`
}

function checkboxChange(){
    let checked = checkbox.checked;
    console.log(`The checkbox has this state: ${checked}`)

    if(checked){
        body.style.outline = "solid";
    } else {
        body.style.outline = "none";
    }
}

function animationPress(){
    robot.style.visibility ='visible'
}