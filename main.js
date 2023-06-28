let pieces = document.getElementById('store')
pieces.style.visibility = 'hidden'
console.log('hello')

let column1 = document.getElementById('column0')
let column2 = document.getElementById('column1')
let column3 = document.getElementById('column2')
let column4 = document.getElementById('column3')
let column5 = document.getElementById('column4')
let column6 = document.getElementById('column5')
let column7 = document.getElementById('column6')
let red = document.getElementById('red')
let black = document.getElementById('black')
let clickCount = 0

const boardModel = [
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
]

let currentPlayer = 1 //red = 1   black = 2
let numberOfDiscsDropped = 0
let msg = document.getElementById('message')
let win = document.getElementById('body')
const displayMessage = function (message) {
    msg.innerHTML = message
    console.log(message)
}

const winner = function (end){
    document.body.innerHTML = end
}

const tieGame = function (tie) {
    document.body.innerHTML = tie
}

const displayCurrentPlayer = function (playerNum) {
    displayMessage("Current player: " + playerNum)
}

const isColumnFull = function (colNum) {
    // TODO: Look at the boardModel to determine if col is full
    for(let i = 0; i < boardModel.length; i++){
        if(boardModel[0][colNum] === 1){
            return true
        }else if(boardModel[0][colNum] === 2){
            return true
        }else {
            return false
        }
    }
}

const dropDisc = function ( columnNum, selectedCol, currentPlayer) {
    // TODO: Add a disc to the DOM for the current player
    // <div class="disc red"></div>
    // TODO: Add a disc to the boardModel
    if(currentPlayer === 1){
        let blackDisc = document.querySelector('#blackDisc')
        let newBlackDisc = blackDisc.cloneNode(true)
        selectedCol.appendChild(newBlackDisc)

    } else if(currentPlayer === 2){
        let redDisc = document.querySelector('#redDisc')
        let newRedDisc = redDisc.cloneNode(true)
        selectedCol.appendChild(newRedDisc)
    }
    let row = 6 - selectedCol.childElementCount
    boardModel[row][columnNum] = currentPlayer
    numberOfDiscsDropped++
}

const isGameOver = function (model) {
    // Check for a win
    // Check for a tie (numberofDiscsDropped === 42)
    if(winnerVertical(model) === true || winnerHorizontal(model) === true || winnerDiagonalUp(model) === true || winnerDiagonalDown(model) === true){
        displayWinMessage()
    }else if (isATie(model) === true) {
        displayTieMessage()
    }
    return false
}

const displayTieMessage = function () {
    displayMessage("Tie game!")
    tieGame('ITS A TIE!')
}

const displayWinMessage = function () {
    displayMessage("Winner is player " + currentPlayer)
    winner('PLAYER ' + currentPlayer + ' IS THE WINNER')
}

const winnerVertical = function (model) {
    for (let rowNum=0; rowNum<3; rowNum++) {
        for (let colNum=0; colNum<model[rowNum].length; colNum++) {
            if (model[rowNum][colNum] === model[rowNum+1][colNum] &&
                model[rowNum][colNum] === model[rowNum+2][colNum] &&
                model[rowNum][colNum] === model[rowNum+3][colNum] &&
                model[rowNum][colNum] !== null) {
                return true
            }
        }
    }
    return false
}

const winnerHorizontal = function (model) {
    for (let rowNum = 0; rowNum < model.length; rowNum++) {
        for (let colNum = 0; colNum < 4; colNum++) {
            if (model[rowNum][colNum] === model[rowNum][colNum + 1] &&
                model[rowNum][colNum] === model[rowNum][colNum + 2] &&
                model[rowNum][colNum] === model[rowNum][colNum + 3] &&
                model[rowNum][colNum] !== null) {
                return true
            }
        }
    }
    return false
}
//I'm unsure about this one
const winnerDiagonalUp = function (model) {
    for (let rowNum = 5; rowNum > 2; rowNum--) {
        for (let colNum = 0; colNum < 4; colNum++) {
            if (model[rowNum][colNum] === model[rowNum - 1][colNum + 1] &&
                model[rowNum][colNum] === model[rowNum - 2][colNum + 2] &&
                model[rowNum][colNum] === model[rowNum - 3][colNum + 3] &&
                model[rowNum][colNum] !== null) {
                return true
            }
        }
    }
    return false
}
// Unsure about this one as well
const winnerDiagonalDown = function (model) {
    for (let rowNum = 0; rowNum < 3; rowNum++) {
        for (let colNum = 0; colNum < 4; colNum++) {
            if (model[rowNum][colNum] === model[rowNum + 1][colNum + 1] &&
                model[rowNum][colNum] === model[rowNum + 2][colNum + 2] &&
                model[rowNum][colNum] === model[rowNum + 3][colNum + 3] &&
                model[rowNum][colNum] !== null) {
                return true
            }
        }
    }
    return false
}

const isATie = function (model) {
    if (numberOfDiscsDropped === 42 &&
        winnerDiagonalDown(boardModel) === false &&
        winnerHorizontal(boardModel) === false &&
        winnerVertical(boardModel) === false &&
        winnerDiagonalUp(boardModel) === false) {
        return true
    }
    return false
}

const switchToNextPlayer = function () {
    if (currentPlayer === 1 ){
        currentPlayer = 2
        displayMessage("player 2")
    } else {
        displayMessage("player 1")
        currentPlayer = 1
    }
    
}

const columnClickHandler = function (eventObj) {
    const selectedCol = eventObj.currentTarget
    const columnNum = Number(selectedCol.id.slice(-1))
    if (isColumnFull(columnNum)) {
        displayMessage("Can't drop a disc in a full column")
    } else {
        dropDisc(columnNum, selectedCol, currentPlayer) 

        const gameStatus = isGameOver(boardModel)
        if (gameStatus === "tie") {
            displayTieMessage()
        } else if (gameStatus === "win") {
            displayWinMessage()
        } else {
            switchToNextPlayer()
        }
    }
}

const setUpEventListeners = function () {
    document.querySelector('#column0').addEventListener('click', columnClickHandler)
    document.querySelector('#column1').addEventListener('click', columnClickHandler)
    document.querySelector('#column2').addEventListener('click', columnClickHandler)
    document.querySelector('#column3').addEventListener('click', columnClickHandler)
    document.querySelector('#column4').addEventListener('click', columnClickHandler)
    document.querySelector('#column5').addEventListener('click', columnClickHandler)
    document.querySelector('#column6').addEventListener('click', columnClickHandler)
}

const initializeGame = function () {
    setUpEventListeners()
    displayCurrentPlayer(currentPlayer)
}

initializeGame()

const testWinnerVertical = function () {
    console.log("Empty board: " + (winnerVertical([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === false))
    console.log("Player 1 win on Column 1: " + (winnerVertical([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ]
    ]) === true))
    console.log("Player 2 win on Column 1: " + (winnerVertical([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [    2, null, null, null, null, null, null ],
        [    2, null, null, null, null, null, null ],
        [    2, null, null, null, null, null, null ],
        [    2, null, null, null, null, null, null ]
    ]) === true))
    console.log("Player 2 win on top of Column 7: " + (winnerVertical([
        [ null, null, null, null, null, null, 2 ],
        [ null, null, null, null, null, null, 2 ],
        [ null, null, null, null, null, null, 2 ],
        [ null, null, null, null, null, null, 2 ],
        [ null, null, null, null, null, null, 1 ],
        [ null, null, null, null, null, null, 1 ]
    ]) === true))
    console.log("Player 1 win on middle of Column 3: " + (winnerVertical([
        [ null, null, null, null, null, null, 2 ],
        [ null, null,    1, null, null, null, 2 ],
        [ null, null,    1, null, null, null, 2 ],
        [ null, null,    1, null, null, null, 2 ],
        [ null, null,    1, null, null, null, 1 ],
        [ null, null, null, null, null, null, 1 ]
    ]) === true))
    console.log("Random board with no winner yet: " + (winnerVertical([
        [ null, null, null, null, null, null, null ],
        [ null, null,    2, null, null, null, null ],
        [    1, null,    2, null,    2, null, null ],
        [    1, null,    2, null,    1, null, null ],
        [    2,    2,    1,    1,    2, null,    2 ],
        [    2,    1,    2,    1,    1,    2,    1 ]
    ]) === false))
}
// testWinnerVertical()

const testWinnerHorizontal = function() {
    console.log('Empty board: ' + (winnerHorizontal([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Player 1 win on row 2: ' + (winnerHorizontal([
        [ null, null, null, null, null, null, null ],
        [    1,    1,    1,    1, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Player 2 win on row 2: ' + (winnerHorizontal([
        [ null, null, null, null, null, null, null ],
        [    2,    2,    2,    2, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Player 2 win in middle of row 5: ' + (winnerHorizontal([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null,    2,    2,    2,    2, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Random board with no winner yet: ' + (winnerHorizontal([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [     2, null, null, null, null, null, null ],
        [     1,    2,    1, null, null, null, null ],
        [     1,    2,    2, null, null, null, null ],
        [     1,    2,    1,    1,    1, null, null ]
    ]) === true))
}
// testWinnerHorizontal()

const testWinnerDiagonalUp = function() {
    console.log('Empty board: ' + (winnerDiagonalUp([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Player 1 wins starting on row 4: ' + (winnerDiagonalUp([
        [ null, null, null,    1, null, null, null ],
        [ null, null,    1, null, null, null, null ],
        [ null,    1, null, null, null, null, null ],
        [    1, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Player 2 wins starting on row 6: ' + (winnerDiagonalUp([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null,    2 ],
        [ null, null, null, null, null,    2, null ],
        [ null, null, null, null,    2, null, null ],
        [ null, null, null,    2, null, null, null ]
    ]) === true))
    console.log('Player 2 wins starting in middle of row 5: ' + (winnerDiagonalUp([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null,    2, null, null ],
        [ null, null, null,    2, null, null, null ],
        [ null, null,    2, null, null, null, null ],
        [ null,    2, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Random board with no winner yet: ' + (winnerDiagonalUp([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [     2, null, null, null, null, null, null ],
        [     1,    2,    1, null, null, null, null ],
        [     1,    2,    2, null, null, null, null ],
        [     1,    2,    1,    1,    1, null, null ]
    ]) === true))
}
// testWinnerDiagonalUp()

const testWinnerDiagonalDown = function() {
    console.log('Empty board: ' + (winnerDiagonalDown([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Player 1 wins starting on row 3: ' + (winnerDiagonalDown([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null,    1, null, null, null, null, null ],
        [ null, null,    1, null, null, null, null ],
        [ null, null, null,    1, null, null, null ],
        [ null, null, null, null,    1, null, null ]
    ]) === true))
    console.log('Player 2 wins starting on row 1: ' + (winnerDiagonalDown([
        [    2, null, null, null, null, null, null ],
        [ null,    2, null, null, null, null, null ],
        [ null, null,    2, null, null, null, null ],
        [ null, null, null,    2, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
    console.log('Player 2 wins starting in middle of row 5: ' + (winnerDiagonalDown([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null,    2, null, null, null ],
        [ null, null, null, null,    2, null, null ],
        [ null, null, null, null, null,    2, null ],
        [ null, null, null, null, null, null,    2 ]
    ]) === true))
    console.log('Random board with no winner yet: ' + (winnerDiagonalDown([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [    2, null, null, null, null, null, null ],
        [    1,    2,    1, null, null, null, null ],
        [    1,    2,    2, null, null, null, null ],
        [    1,    2,    1,    1,    1, null, null ]
    ]) === true))
}
// testWinnerDiagonalDown()

function practiceTest(){
    console.log('Play 2 wins in the rightmost column: ' + (winnerVertical([
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null,    2 ],
        [ null, null, null, null, null, null,    2 ],
        [ null, null, null, null, null, null,    2 ],
        [ null, null, null, null, null, null,    2 ]
    ]) === true))
    console.log('Player 1 wins in the top column: ' + (winnerHorizontal([
        [    2,    2,    2, null, null, null, null ],
        [ null, null, null,    2, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ],
        [ null, null, null, null, null, null, null ]
    ]) === true))
}
// practiceTest()