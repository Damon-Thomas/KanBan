import { updateHomePage } from "."
import { updateBoardPage } from "."

const boards = []
createBoard("My Coding Journey")
createBoard("House Maintanence this year")


function createBoard(boardname) {
    
    let board = {name: boardname, tasks: [], statuses: ["ToDo", "In Progress", "Done"]}
    boards.push(board)
}

function addTaskToBoard(boardname, task) {
    console.log(task)
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].name === boardname) {
            boards[i].tasks.push(task)
        }
    }
    console.log(boards)
}



function addStatusToBoard(boardname, status) {
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].name === boardname) {
            boards[i].statuses.push(status)
            
        }
    }
    
}

function createNewBoard(boardtitle) {
    const dialog = document.getElementById('create-board')
    const form = document.getElementById("form")
    createBoard(boardtitle)
    dialog.close();
    form.reset()
    
    boardList()
}

// delete the board from the list
function deleteBoard(board){
    let index = boards.indexOf(board)
    boards.splice(index, 1)
    updateHomePage()
}

// last chance notification
function confirmDeleteBoard(boardDiv, board) {
    
    boardDiv.innerHTML = ""
    const warningMessage = document.createElement('h3')
    warningMessage.classList.add('delete-text')
    const finalDeleteButton = document.createElement('button')
    finalDeleteButton.classList.add('delete-button')
    warningMessage.textContent = `Are you sure you want to delete your "${board["name"]}" board? This CANNOT be undone.`
    finalDeleteButton.textContent = "Delete"
    finalDeleteButton.addEventListener("click", function(event) {
        event.stopPropagation()
        deleteBoard(board)
    })
    const cancelDeleteButton = document.createElement('button')
    cancelDeleteButton.classList.add('cancel-button')
    cancelDeleteButton.textContent = "Cancel"
    cancelDeleteButton.addEventListener("click", function(event){
        event.stopPropagation()
        boardDiv.classList.remove('delete-mode')
        
        updateHomePage()
    })
    boardDiv.appendChild(warningMessage)
    boardDiv.appendChild(cancelDeleteButton)
    boardDiv.appendChild(finalDeleteButton)
}



// Create Board Nodes
function boardList() {
    const theList = []
    for (let i = 0; i <= boards.length-1; i++) {
        const activeBoard = boards[i]
        
        const boardDiv = document.createElement('div')
        boardDiv.classList.add('board-button')
        const boardName = document.createElement("h1")
        boardName.textContent = activeBoard['name']
        const numBoardTasks = activeBoard['tasks'].length
        const taskNumber = document.createElement('p')
        taskNumber.textContent = `Pending Tasks: ${numBoardTasks}`
        const deleteboardDiv = document.createElement('button')
        deleteboardDiv.textContent = "Delete Board"
        deleteboardDiv.classList.add('delete')
        

        deleteboardDiv.addEventListener("click", function() {
             
                
           
            boardDiv.classList.add('delete-mode')
            confirmDeleteBoard(boardDiv, activeBoard)
            
        })






        boardDiv.addEventListener("click", function(event) {
            event.stopPropagation()
            if (boardDiv.classList.contains('delete-mode')) {
                return
            }
            
            updateBoardPage(activeBoard['name'])
        })
        boardDiv.appendChild(boardName)
        boardDiv.appendChild(taskNumber)
        boardDiv.appendChild(deleteboardDiv)
        theList.push(boardDiv)
    }
    
    return theList
}

export {boards, createBoard, addTaskToBoard, createNewBoard, boardList, addStatusToBoard}