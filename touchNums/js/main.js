'use script'

var SIZE = 4
var gTimeInterval
var gNextNum

function initGame(){
    displayBlockDivSize()
    gBoard = []
    for(var i = 0; i < SIZE ** 2; i++){
        gBoard[i] = i + 1
    }
    gBoard.sort((a, b) => 0.5 - Math.random())
    gNextNum = 1
    gGameTime = 0
    nextNum()
    if(gTimeInterval) clearInterval(gTimeInterval)
    renderBoard()
}

function renderBoard() {
    var strHTML = ''
    var indexBoard = 0
    for(var i = 0; i < SIZE; i++){
        strHTML += '<tr>'
        for(var j = 0; j < SIZE; j++){
            strHTML += `<td onclick="checkAnswer(this)">${gBoard[indexBoard]}</td>`
            indexBoard++
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function checkAnswer(elCell){
    if(gNextNum === 1){
        gTimeInterval = setInterval(displayGameTime, 1000)
        displayNoneDivSize()
    } 

    if(gNextNum === +elCell.innerText){
        elCell.style.backgroundColor = 'rgb(43, 42, 42)'
        gNextNum++
    }

    if(gNextNum > SIZE ** 2) clearInterval(gTimeInterval)
    else nextNum()
}

function nextNum(){
    const elSpan = document.querySelector('.next-num')
    elSpan.innerText = gNextNum
}

function displayGameTime(){ 
    var elTime = document.querySelector('.game-time')
    // elTime.innerText =  (gGameTime / 60).toFixed(2)
    elTime.innerText =  convertTime(gGameTime)
    gGameTime++
}

function convertTime(second) {
    var minute = Math.floor(second / 60)
    second = second % 60
    const strSecond = second < 10 ? '0' + second : second
    const strMinutes = minute < 10 ? '0' + minute : minute 

    return strMinutes + ':' + strSecond
}

function displayNoneDivSize(){
    const elDivSize = document.querySelector('.div-size')
    elDivSize.style.display = 'none'
}

function displayBlockDivSize(){
    const elDivSize = document.querySelector('.div-size')
    elDivSize.style.display = 'block'
}

function changeBoardSize(elSelect){
    SIZE = elSelect.options[elSelect.selectedIndex].text
    initGame()
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}