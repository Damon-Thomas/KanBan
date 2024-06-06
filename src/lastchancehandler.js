import { updateHomePage } from "."
import { deleteBoard } from "./board"
// delete board button last chance,cancel, delete
// 
// last chance handler
function confirmDeleteBoard(boardDiv, board) {
    
    boardDiv.innerHTML = ""
    
    boardDiv.appendChild(createWarningMessage(board))
    boardDiv.appendChild(createCancelDeleteButton(boardDiv))
    boardDiv.appendChild(createFinalDeleteButton(board))
}

// cancel delete button creation 
function createCancelDeleteButton(boardDiv) {
    const cancelDeleteButton = document.createElement('button')
    cancelDeleteButton.classList.add('cancel-button')
    cancelDeleteButton.textContent = "Cancel"
    cancelDeleteButton.addEventListener("click", function(event){
        cancelDelete(event, boardDiv)
    
    })
    return cancelDeleteButton
}

// final delete button creation
function createFinalDeleteButton(board) {
    const finalDeleteButton = document.createElement('button')
    finalDeleteButton.classList.add('delete-button')
    
    finalDeleteButton.textContent = "Delete"
    finalDeleteButton.addEventListener("click", function(event) {
        finalDelete(event, board)
    })
    return finalDeleteButton
}

// board delete warning message
function createWarningMessage(board) {
    const warningMessage = document.createElement('h3')
    warningMessage.classList.add('delete-text')
    warningMessage.textContent = `Are you sure you want to delete your "${board["name"]}" board? This CANNOT be undone.`

    return warningMessage
}

// cancel button Functionality - return to board page
function cancelDelete(event, boardDiv) {
    event.stopPropagation() // stop from clicking parent as well
    boardDiv.classList.remove('delete-mode')
    updateHomePage()
}

// delete Button Functionality - remove board from master list
function finalDelete(event, board) {
    event.stopPropagation() // stop from clicking parent as well
    deleteBoard(board)
    updateHomePage()
}

export {confirmDeleteBoard}