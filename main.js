const jpMessageArray = ["スペースを押してゲーム開始", "一時停止中(スペースを押して再開)", "そこまで！"];
const enMessageArray = ["Ready", "Pause", "Finished！"];

const jpWord = document.querySelector(".jp_word");
const enWord = document.querySelector(".en_word .until_type");
const typedWord = document.querySelector(".en_word .typed");

function messageChanger(target, message) {
    target.innerText = message;
}

const keyboardArray = document.querySelectorAll(".key_board_box p");

let timerIntervalId;
let isGameStarted = false;

let downKey;
let downKeyCode;
let upKey;
let upKeyCode;

window.addEventListener("keydown", (event) => {
    downKey = event.key.toUpperCase();
    downKeyCode = event.code;
    downKeyManager();
    if (!isGameStarted && timerIntervalId == null && downKeyCode == "Space" ) {
        timerIntervalId = setInterval(readyMessageChanger, 1000);
        console.log(timerIntervalId);
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
    if (isGameStarted) {
        typeJuge(downKey);
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

let typedTmp = new String();
let correctPoint = 0;
let wrongPoint = 0;
let judgeTarget = String;

const correctPointBox = document.querySelector(".correct_type_count span");
const wrongPointBox = document.querySelector(".wrong_type_count span");

function typeJuge(typeKey) {
    judgeTarget = enWord.innerText.substr(0, 1);

    if (typeKey == judgeTarget.toUpperCase()) {
        enWord.innerText = enWord.innerText.slice(1);
        typedTmp += judgeTarget;
        typedWord.innerText = typedTmp;
        correctPoint += 1;
        correctPointBox.innerText = correctPoint.toString().padStart(2, "0");
    }
    else {
        wrongPoint += 1;
        wrongPointBox.innerText = wrongPoint.toString().padStart(2, "0");
        console.log(wrongPoint);
    }
}

const gameTime = 18000;
let leaveTime = gameTime;
const timeCount = document.querySelector(".timer");

function gameTimer() {
    leaveTime -= 1;
    messageChanger(timeCount, timeFormater());
    if (leaveTime == 0) {
        messageChanger(jpWord, jpMessageArray[2]);
        messageChanger(enWord, enMessageArray[2]);
        clearInterval(timerIntervalId);
        timerIntervalId = null;
        setTimeout(gameReset, 1000);
    }
}

function gameStart() {
    isGameStarted = true;
    ploblemSet();
    timerIntervalId = setInterval(function() {
        gameTimer();
        if (enWord.innerText.length == 0) {
            typedTmp = "";
            typedWord.innerText = "";
            ploblemSet();
        }
    }, 10);
}

const readyMessageArray = ["3", "2", "1", "始め！"]
let readyMessageIndex = 0;

function readyMessageChanger() {
    messageChanger(jpWord, readyMessageArray[readyMessageIndex]);
    messageChanger(enWord, enWord.innerText + ".");
    readyMessageIndex += 1;
    if (readyMessageIndex == readyMessageArray.length) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
        messageChanger(enWord, "Start!");
        setTimeout(gameStart, 1000);
        readyMessageIndex = 0;
    }
}

let minTime;
let secTime;
let decTime;

function timeFormater() {
    const tmpMinTime = Math.floor(leaveTime / 6000);
    const tmpSecTime = leaveTime % 6000;
    const tmpDecTime = leaveTime.toString().padStart(5, "0").substr(3, 2);
    const formatMinTime = tmpMinTime.toString();
    const formatSecTime = tmpSecTime.toString().padStart(4, "0").substr(0, 2);
    const formatDecTime = tmpDecTime.toString();
    minTime = formatMinTime.substr(0, 1);
    secTime = formatSecTime;
    decTime = formatDecTime;
    let formatTime = minTime + ":" + secTime + ":" + decTime;
    return formatTime
}

function gameReset() {
    isGameStarted = false;
    clearInterval(timerIntervalId);
    timerIntervalId = null;
    readyMessageIndex = 0;
    correctPoint = 0;
    correctPointBox.innerText = "00";
    wrongPoint = 0;
    wrongPointBox.innerText = "00";
    leaveTime = gameTime;
    typedTmp = "";
    typedWord.innerText = "";
    messageChanger(timeCount, timeFormater());
    messageChanger(jpWord, jpMessageArray[0]);
    messageChanger(enWord, enMessageArray[0]);
}
gameReset();


const resetBtn = document.querySelector(".retry_btn");
const pauseBtn = document.querySelector(".pause_btn");

resetBtn.addEventListener("click", () => gameReset());

pauseBtn.addEventListener("click", function () {
    if (timerIntervalId != null) {
        isGameStarted = false;
        typedTmp = "";
        typedWord.innerText = ""; 
        clearInterval(timerIntervalId);
        timerIntervalId = null;
        messageChanger(jpWord, jpMessageArray[1]);
        messageChanger(enWord, enMessageArray[1]);
    }   
});

const ploblemArray = [
    ["こんにちは", "konnnitiha"],
    ["おはようございます", "ohayougozaimasu"],
    ["プログラマーになりたいな", "purogurama-ninaritaina"],
    ["人生かけて僕は", "jinnseikaketebokuha"],
    ["オブジェクト指向っていう響きが好き", "obujekutosikoutteiuhibikigasuki"],
    ["エラーとの戦い", "era-tonotatakai"],
    ["バグが治らない日はとりあえず寝る", "baguganaoranaihihatoriaezuneru"],
    ["何事も日々の積み重ね", "nanigotomohibinotumikasane"],
    ["ドラクエやり込みたい", "dorakueyarikomitai"],
    ["ポケモンのソースコード見てみたい", "pokemonnnoso-suko-domitemitai"]
    ];

function ploblemSet() {
    const ploblemIndex = Math.floor(Math.random() * ploblemArray.length);
    messageChanger(jpWord, ploblemArray[ploblemIndex][0])
    messageChanger(enWord, ploblemArray[ploblemIndex][1])
    console.log(ploblemIndex);
}
