'use strict'


var gNums = [1, 2, 3, 4, 5, 6, 7, 8, 9] //default function for gNums 

var gTurn = 1 // keeps track of what turn it is

var gStartTime
var gTimerInterval

function onInit() {
    shuffleArray(gNums)
    showCurrentNum()
    rendnerTable()
}

function createGnums(elBtn) {
    gNums = []
    for (var i = 0; i < elBtn.innerText; i++) {
        gNums[i] = i + 1
    }

    restartGame()
}

function restartGame() {
    hideModal()
    gTurn = 1
    clearInterval(gTimerInterval)
    setTimeout(() => { document.querySelector('.timer-span').innerText = `0 : 000` }, 200)
    onInit()
}


function isVictory(clickedNum) { 
    if (clickedNum === gNums.length) {
        showModal()
        clearInterval(gTimerInterval)
    }
}

function showCurrentNum(){
    var elspan = document.querySelector('h2 span')
    elspan.innerText = gTurn
}

function onCellClicked(elCell, clickedNum) {
    
    if (gTurn === clickedNum) {
        elCell.style.backgroundColor = 'yellow'
        gTurn++
        
        showCurrentNum()
        
        if (clickedNum === 1) {
            gStartTime = Date.now()
            gTimerInterval = setInterval(updateTimer, 10)
        }
        isVictory(clickedNum)
    }
}

function rendnerTable() {
    
    var strHtml = ''
    var sum = 0
    
    for (var i = 0; i < Math.sqrt(gNums.length); i++) {
        strHtml += `<tr>`
        for (var j = 0; j < Math.sqrt(gNums.length); j++) {
            var currNum = gNums[sum]
            sum++
            strHtml += `<td class="${currNum}" onclick="onCellClicked(this, ${currNum})"> ${currNum} </td>`
        }
        strHtml += `<tr>`
    }
    
    
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
    
    
}

function showModal() {
    var elmodal = document.querySelector('.modal')
    elmodal.style.display = 'block' 
}

function hideModal() {
    var elmodal = document.querySelector('.modal')
    elmodal.style.display = 'none' 
}


function shuffleArray(arr) {
    arr.sort(function (a, b) {
        return Math.random() - 0.5;
    });
}


function updateTimer() {
    const elapsed = Date.now() - gStartTime
    const seconds = Math.floor(elapsed / 1000)
    const milliseconds = String(elapsed % 1000).padStart(3, '0')

    document.querySelector('.timer-span').innerText = `${seconds} : ${milliseconds}`
}