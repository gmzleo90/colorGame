//utils color
let colors = [],
    pickedColor = '',
    selectedColor = '',
    numberOfSquares;

//set variables for modal notifications
const openEls = document.querySelectorAll("[data-open]");
const isVisible = "is-visible";
const modal = document.getElementById("modal1")

document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", function (e) {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
        reset(e);
    });
})

//document querys
const SQUARES = document.querySelectorAll(".square");
const SPAN_MESSAGE = document.getElementById("message");
const BODY_COLOR = document.querySelector('body').style.backgroundColor;
const H1_COLOR_DISPLAY = document.getElementById("colorDisplay");
const HTML_BUTTONS = {
    reset: document.getElementById("reset"),
    easy: document.getElementById("easyButton"),
    hard: document.getElementById("hardButton")
}
//add listener to buttons
HTML_BUTTONS.easy.addEventListener('click', setLevel);
HTML_BUTTONS.hard.addEventListener('click', setLevel);
HTML_BUTTONS.reset.addEventListener('click', reset);

//first Star Game
reset();



//assign colors to divs.square
function setupSquares(option = 'init') {
    SQUARES.forEach((square, i) => {
        //assign color
        if (option === 'init') square.style.backgroundColor = colors[i];
        //add Event Listener 'click' to each square
        square.addEventListener('click', handleColorClick);
    });
}

//handle clicks to each color square
function handleColorClick(e) {
    selectedColor = e.target.style.backgroundColor;

    if (selectedColor === pickedColor) {
        SPAN_MESSAGE.innerText = 'Very good!, Amaizing!';
        for (const button in HTML_BUTTONS) {
            HTML_BUTTONS[button].disabled = true
        }
        changeColors(pickedColor);
        e.target.removeEventListener('click', handleColorClick, false);
        //HTML_BUTTONS.reset.innerText = 'Play Again?'
        notification('Nice!', 'You win!, click Restart Game to play again', 'RESTART GAME');
    } else {
        e.target.style.backgroundColor = BODY_COLOR;
        e.target.style.cursor = 'default';
        e.target.classList.remove("hover");
        SPAN_MESSAGE.innerText = "Try again";
        e.target.removeEventListener('click', handleColorClick, false);
    }
}
//some HTML elements will change color to the winner color
function changeColors(inputColor) {
    H1_COLOR_DISPLAY.style.backgroundColor = inputColor;
    SQUARES.forEach((square) => {
        square.style.backgroundColor = inputColor;
    });
}

function pickColor(level) {
    let randomIndex = Math.floor(Math.random() * level);
    pickedColor = colors[randomIndex];
}

function RandomColor() {

    let colorValue = 'rgb(';

    for (let i = 0; i < 4; i++) {

        if (i < 1) {
            colorValue += `${Math.floor(Math.random() * 256)},`;
        } else if (i < 2) {
            colorValue += ` ${Math.floor(Math.random() * 256)},`;
        } else if (i < 3) {
            colorValue += ` ${Math.floor(Math.random() * 256)})`;
        }

    }
    return colorValue
}

//dificult level is setted here
function generateRandomColors() {
    let colorsArray = [];
    colors = [];
    for (let i = 0; i < 6; i++) {
        colorsArray.push(RandomColor());
    }
    colors.push(...colorsArray);


}

function setLevel(e) {
    levelsBehaviour = {
        easy: (e) => {
            if (e) {
                if (e.target.className !== 'selected') reset();
            }


            HTML_BUTTONS.easy.className = 'selected';
            HTML_BUTTONS.hard.className = '';
            numberOfSquares = 3

            SQUARES.forEach((e, i) => {
                if (i > 2) e.style.display = 'none'
            })
            pickColor(numberOfSquares);


        },
        hard: (e) => {
            if (e) {
                if (e.target.className !== 'selected') reset();
            }
            HTML_BUTTONS.easy.className = ''
            HTML_BUTTONS.hard.className = 'selected'
            numberOfSquares = 6
            SQUARES.forEach((e, i) => {
                e.style.display = ''
            })
        }
    }
    if (!e) {
        levelsBehaviour.easy()
    } else {
        e.target.id === 'easyButton' ? levelsBehaviour.easy(e) : levelsBehaviour.hard(e);
    }
}

//call function to setup game initiation
function reset(e = null) {
    squaresBehaviourReset();
    if (!e) setLevel();
    generateRandomColors();
    pickColor(numberOfSquares)
    setupSquares();
    for (const button in HTML_BUTTONS) {
        HTML_BUTTONS[button].disabled = false
    }
    //if reset button is pressed there is event
    if (e) {
        H1_COLOR_DISPLAY.style.backgroundColor = BODY_COLOR;
        SPAN_MESSAGE.innerText = ''
        HTML_BUTTONS.reset.innerText = 'Refresh Colors'
    }
    H1_COLOR_DISPLAY.innerText = pickedColor;
}

function squaresBehaviourReset() {
    SQUARES.forEach((square) => {
        square.style.cursor = 'pointer';
        square.classList.add('hover');
    })
}

function notification(modalTitle, bodyMessage, buttonText) {
    document.querySelector("span.modal-title").innerHTML = `<h3>${modalTitle}</h3>`;
    document.querySelector("section.modal-content").innerText = bodyMessage;
    document.getElementById("modal-button").innerHTML = `<h3>${buttonText}</h3>`
    modal.classList.add(isVisible);
}







