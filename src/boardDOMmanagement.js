import { createBoard, boards } from "./board";
import { confirmDeleteBoard } from "./lastchancehandler";
import { updateBoardPage } from ".";


// Board DOM Management
// 
// close dialog and add board to master list
function createNewBoard(boardtitle) {
    const dialog = document.getElementById('create-board')
    const form = document.getElementById("form")
    createBoard(boardtitle)
    dialog.close();
    form.reset()
    boardList()
}

// creating board to be placed on homepage
// 
// delete board button functionality
function deleteBoardButton(boardDiv, activeBoard) {
    boardDiv.classList.add('delete-mode')
    confirmDeleteBoard(boardDiv, activeBoard) //go to last chance board delete handler
}

// delete board button creation
function createDeleteBoardButton(boardDiv, activeBoard) {
    const deleteboardDiv = document.createElement('button')
    deleteboardDiv.textContent = "Delete Board"
    deleteboardDiv.classList.add('delete-board-button')
    
    deleteboardDiv.addEventListener("click", function() {
        deleteBoardButton(boardDiv, activeBoard) 
    })

    return deleteboardDiv
}

// Task Tracker For Board
function createTaskTrackerNode(activeBoard) {
    const numBoardTasks = activeBoard['tasks'].length
    const taskNumber = document.createElement('p')
    taskNumber.textContent = `Total Tasks: ${numBoardTasks}`
    
    return taskNumber
}

// Board Title Creation
function createBoardTitle(activeBoard) {
    const boardName = document.createElement("h1")
    boardName.classList.add("board-card-title")
    boardName.textContent = activeBoard['name']

    return boardName
}

// Create Single Board Node
function createBoardNode(activeBoard){
    const boardDiv = document.createElement('div')
    boardDiv.classList.add('board-div')
    
    boardDiv.appendChild(createBoardTitle(activeBoard))
    boardDiv.appendChild(createTaskTrackerNode(activeBoard))
    boardDiv.appendChild(createDeleteBoardButton(boardDiv, activeBoard))
    boardDiv.addEventListener("click", function(event) {
        toBoardPage(event, boardDiv, activeBoard)
    })
    return boardDiv
}

// Load BoardPage Manager
function toBoardPage(event, boardDiv, activeBoard) {
    event.stopPropagation() // don't select parent
    if (boardDiv.classList.contains('delete-mode')) { //stop function when in delete mode
        return
    }
    updateBoardPage(activeBoard['name']) //refresh screen
    }


// Create Board Nodes list from Master List
function boardList() {
    const theList = []
    for (let i = 0; i < boards.length; i++) {
        const activeBoard = boards[i]
        const boardDiv = createBoardNode(activeBoard)
        theList.push(boardDiv)
    }
    
    return theList
}

export {createNewBoard, boardList}