let isGameStarted = 0;

const jpMessageArray = ["スペースを押してゲーム開始", "一時停止中", "そこまで！"];
const enMessageArray = ["Ready", "Pause", "Finished！"];

const jpWord = document.querySelector(".jp_word");
const enWord = document.querySelector(".en_word");

function messageChanger(target, message) {
    target.innerText = message;
}
messageChanger(jpWord, jpMessageArray[0]);
messageChanger(enWord, enMessageArray[0]);

let upKey;
let upKeyCode;

window.addEventListener("keyup", (event) => {
    upKey = event.key;
    upKeyCode = event.code;
    console.log(upKeyCode);
});

let timerIntervalId;

window.addEventListener("keydown", (event) => {
    const downKey = event.code;
    if (!isGameStarted && downKey == "Space" ) {
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
    }
}

const readyMessageArray = ["3", "2", "1", "開始！"]
let readyMessageIndex = 0;

function readyMessageChanger() {
    messageChanger(jpWord, readyMessageArray[readyMessageIndex]);
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