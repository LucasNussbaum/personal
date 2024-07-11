const invertButton = document.getElementById("invert-color")
const body = document.body;
const colorField = document.getElementById("color-field");
const fontSizeField = document.getElementById("font-size-field");


function toggleInvert() {
    document.body.classList.toggle('invert');
}

function buttonPress(){

    body.style.backgroundColor = colorField.value;

    const paragraphArray = document.getElementsByTagName("p");
    for (let paragraph of paragraphArray) {
        console.log('gt')
        paragraph.style.fontSize = `${fontSizeField.value}px`
    }
}

