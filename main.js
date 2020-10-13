const jpMessageArray = ["スペースを押してゲーム開始", "一時停止中", "そこまで！"];
const enMessageArray = ["Ready", "Pause", "Finished！"];

const jpWord = document.querySelector(".jp_word");
const enWord = document.querySelector(".en_word");

function messageChanger(target, message) {
    target.innerText = message;
}

const keyboardArray = document.querySelectorAll(".key_board_box p");

let timerIntervalId;

let downKey;
let downKeyCode;
let upKey;
let upKeyCode;

window.addEventListener("keydown", (event) => {
    downKey = event.key.toUpperCase();
    downKeyCode = event.code;
    downKeyManager();
    if (!isGameStarted && downKeyCode == "Space" ) {
        isGameStarted = true;
        timerIntervalId = setInterval(readyMessageChanger, 1000);
        }
});

window.addEventListener("keyup", (event) => {
    upKey = event.key.toUpperCase();
    upKeyCode = event.code;
    upKeyManager();
});

function downKeyManager() {
    if (downKey == " " ) {
        keyboardArray[keyboardArray.length - 1].classList.add("enter");
    }
    else {
        keyboardArray.forEach(Element => {
            if (downKey == Element.innerText) {
                Element.classList.add("enter");
            }
        });
    }
}

function upKeyManager() {
    if (upKey == " " ) {
        keyboardArray[keyboardArray.length - 1].classList.remove("enter");
    }
    else {
        keyboardArray.forEach(Element => {
            if (upKey == Element.innerText) {
                Element.classList.remove("enter");
            }
        });
    }
}

const gameTime = 34000;
let leaveTime = gameTime;
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

function gameStart() {
    timerIntervalId = setInterval(gameTimer, 10);
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

let isGameStarted = Boolean;

function gameReset() {
    isGameStarted = false;
    readyMessageIndex = 0;
    leaveTime = gameTime;
    messageChanger(timeCount, leaveTime);
    messageChanger(jpWord, jpMessageArray[0]);
    messageChanger(enWord, enMessageArray[0]);
}
gameReset();

let minTime;
let secTime;
let decTime;

function timeFormater() {
    const a = leaveTime.toString().substr(-2, );
    console.log(a);
    const tmpMinTime = Math.floor(leaveTime / 60);
    const tmpSecTime = leaveTime % 60;
    const tmpDecTime = leaveTime.toString().substr(3, 2);
    const formatMinTime = tmpMinTime.toString();
    const formatSecTime = tmpSecTime.toString();
    const formatDecTime = tmpDecTime.toString();
    minTime = formatMinTime.substr(0, 1);
    secTime = formatSecTime;
    decTime = formatDecTime;
    let formatTime = minTime + ":" + secTime + ":" + decTime;
    console.log(formatTime);
    return formatTime
}
timeFormater();