const jpMessageArray = ["スペースを押してゲーム開始", "一時停止中", "そこまで！"];
const enMessageArray = ["Ready", "Pause", "Finished！"];

const jpWord = document.querySelector(".jp_word");
const enWord = document.querySelector(".en_word");

function messageChanger(target, message) {
    target.innerText = message;
}

let upKey;
let upKeyCode;

window.addEventListener("keyup", (event) => {
    upKey = event.key;
    upKeyCode = event.code;
    console.log(upKeyCode);
});

const keyboardArray = document.querySelectorAll(".key_board_box p");
let keyArray = [];
function setKeyArray() {
    let tmpArray = [];
    keyboardArray.forEach(Element => {
        tmpArray.push(Element.innerText);
    });
    return tmpArray;
}
keyArray = setKeyArray();
console.log(keyArray);

let timerIntervalId;

window.addEventListener("keydown", (event) => {
    const downKey = event.key.toUpperCase();
    const downKeyCode = event.code;
    if (downKeyCode == "Space" ) {
        keyboardArray[keyboardArray.length - 1].classList.add("enter");
    }
    else {
        keyboardArray.forEach(Element => {
            if (downKey == Element.innerText) {
                Element.classList.add("enter");
            }
        });
    }
    if (!isGameStarted && downKeyCode == "Space" ) {
        isGameStarted = true;
        timerIntervalId = setInterval(readyMessageChanger, 1000);
        }
});

function timerManager() {
    timerIntervalId = setInterval(gameTimer, 10);
}

let leaveTime = 500;
const timeCount = document.querySelector(".timer");

function gameTimer() {
    leaveTime -= 1;
    console.log(leaveTime);
    messageChanger(timeCount, leaveTime);
    if (leaveTime == 0) {
        messageChanger(jpWord, jpMessageArray[2]);
        messageChanger(enWord, enMessageArray[2]);
        clearInterval(timerIntervalId);
        setTimeout(gameReset, 1000);
    }
}

const readyMessageArray = ["3", "2", "1", "開始！"]
let readyMessageIndex = 0;

function readyMessageChanger() {
    messageChanger(jpWord, readyMessageArray[readyMessageIndex]);
    messageChanger(enWord, enWord.innerText + ".");
    readyMessageIndex += 1;
    if (readyMessageIndex == readyMessageArray.length) {
        clearInterval(timerIntervalId);
        messageChanger(enWord, "Start!");
        gameStart();
    }
}

function gameStart() {
    timerManager();
}

let isGameStarted = Boolean;

function gameReset() {
    isGameStarted = false;
    readyMessageIndex = 0;
    leaveTime = 500;
    messageChanger(timeCount, leaveTime);
    messageChanger(jpWord, jpMessageArray[0]);
    messageChanger(enWord, enMessageArray[0]);
}
gameReset();