let answer = "", gridPos, moveCount, gameFinish;
let result = document.getElementById('result');

function createField() {
    let field = document.getElementsByClassName('container')[0];
    for (let i = 0; i<30; i++) addElement(field);
    createKeyboard();
}

function createKeyboard() {
    let keyboard = document.getElementsByClassName('keyboard')[0],
        keys = [
            ['ק','ר','א','ט','ו','ן','ם','פ'],
            ['ש','ד','ג','כ','ע','י','ח','ל','ך','ף'],
            ['ז','ס','ב','ה','נ','מ','צ','ת','ץ'],
            ['שלח','מחק']];
    for(let r = 0; r < 4; r++) {
        let row = addElement(keyboard);
        row.className = 'row';
        for(let k = 0; k < keys[r].length; k++) {
            let key = addElement(row,'button');
            key.setAttribute('onclick', r < 3 ? 'writeLetter(this)' : k < 1 ? 'checkGuess()' : 'deleteLetter()');
            key.innerHTML = keys[r][k];
        }
    }
}

function addElement(obj, type = 'div') {
    let tag = document.createElement(type);
    obj.appendChild(tag);
    return tag;
}

function changeStyle(obj, set){
    if (!obj.hasAttribute('style')) obj.setAttribute('style', '');
    Object.keys(set).forEach(function (key) {
        obj.style[key] = set[key];
    });
}

createField();

function getWord() {
    gridPos = 4;
    moveCount = 0;
    gameFinish = false;
    changeStyle(result, {opacity: 0});
    answer = words[Math.floor(Math.random() * words.length)];
}

function writeLetter(button) {
    if (moveCount == 5 || gameFinish) {
        return;
    }
    const container = document.getElementsByClassName("container")[0];
    container.children[gridPos].innerText = button.innerText;
    gridPos--;
    moveCount++;
}

function checkGuess() {
    if (moveCount != 5) {
        return;
    }
    let chIdx = 0, correct = 0;
    const container = document.getElementsByClassName("container")[0];
    for (let i = gridPos + 5; i > gridPos; i--) {
        if (container.children[i].innerText == answer[chIdx++]) {
            container.children[i].id = "green";
            correct++;
        } else if (answer.includes(container.children[i].innerText)) {
            container.children[i].id = "yellow";
        } else {
            container.children[i].id = "gray";
        }
    }
    if (correct == 5) {
        result.innerText = "!ניצחת";
        changeStyle(result, {opacity: 1});
        gameFinish = true;
    } else if (gridPos == 24) {
        result.innerText = " הפסדת :( המילה הייתה " + answer;
        changeStyle(result, {opacity: 1});
        gameFinish = true;

    }
    gridPos += 10;
    moveCount = 0;
}

function deleteLetter() {
    if (moveCount == 0 || gameFinish) {
        return
    }
    const container = document.getElementsByClassName("container")[0];
    container.children[++gridPos].innerText = "";
    moveCount--;
}

function newGame() {
    let container = document.getElementsByClassName("container")[0];
    for(let i = 0; i<container.children.length;i++){
        container.children[i].innerText = "";
        container.children[i].id = "";
    }
    getWord();
}