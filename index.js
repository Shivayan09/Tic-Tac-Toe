let boxes = document.querySelectorAll(".box");
const scoreText = document.querySelector(".score-text");
let winner = document.querySelector(".winner-text");
let newBtn = document.querySelector("#new-btn");
let winnerDiv = document.querySelector(".winner");
const changeModeButton = document.querySelector('.mode-text');
const headingText = document.querySelector('.heading-text');

let isLightMode = false;

changeModeButton.onclick = () => {
    isLightMode = !isLightMode;
    if (isLightMode) {
        document.body.style.backgroundColor = 'white';
        headingText.style.color = 'black';
        scoreText.style.backgroundColor = 'black';
        scoreText.style.color = 'white';
        winner.style.color = "black";
        newBtn.style.backgroundColor = "black";
        newBtn.style.color = "white";
        boxes.forEach(box => {
            box.style.borderColor = 'black';
            if (box.innerText === 'X' || box.innerText === 'O') {
                box.style.color = 'black';
            }
        });
        changeModeButton.style.backgroundColor = 'black';
        changeModeButton.style.color = 'white';
    } else {
        document.body.style.backgroundColor = 'black';
        headingText.style.color = 'white';
        scoreText.style.backgroundColor = 'white';
        scoreText.style.color = 'black';
        winner.style.color = "white";
        newBtn.style.backgroundColor = "white";
        newBtn.style.color = "black";
        boxes.forEach(box => {
            box.style.borderColor = 'white';
            if (box.innerText === 'X' || box.innerText === 'O') {
                box.style.color = 'white';
            }
        });
        changeModeButton.style.backgroundColor = 'white';
        changeModeButton.style.color = 'black';
    }
};

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    winner.classList.add("hide");
    winner.innerText = "";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = isLightMode ? 'black' : 'white';
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = isLightMode ? 'black' : 'white';
            turnO = true;
        }
        box.style.pointerEvents = "none";
        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.style.pointerEvents = "none";
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.style.pointerEvents = "auto";
        box.innerText = "";
    }
}

const showWinner = (won) => {
    winner.innerText = `Winner is ${won}!`;
    winner.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val!= "" && pos2Val!="" && pos3Val!="") {
            if(pos1Val===pos2Val && pos2Val===pos3Val) {
                console.log("Winner!", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};

newBtn.addEventListener("click", resetGame);
scoreText.addEventListener("click", resetGame);