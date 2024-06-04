import {boardList} from './board.js';
import {createBoardModal, openModal} from "./boardmodal.js"

// Homepage Title Manager
function homeHeader() {
    const title = document.createElement('h1');
    title.textContent = "Kanban Board";
    title.classList.add('main-title');
    return title;
}

// Homepage Content Manager
function homeContent() {
    
    const homeDiv = document.createElement('div')
    homeDiv.classList.add("content")
    homeDiv.appendChild(makeBoardButton())
    homeDiv.appendChild(createBoardModal())
    addBoards(homeDiv)
    return homeDiv
}

// Create Board Button
function makeBoardButton() {
    let createBoardButton = document.createElement('button')
    createBoardButton.classList.add('createboard')
    createBoardButton.textContent = "Create Board"
    createBoardButton.addEventListener("click", openModal)

    return createBoardButton
}

// add boards to a destination
function addBoards(destination) {
    const boardListDiv = document.createElement('div') 
    boardListDiv.classList.add('boardList')
    const allBoards = boardList()
    if (allBoards.length > 0) {
        for (let i = 0; i < allBoards.length; i++) {
            boardListDiv.appendChild(allBoards[i])
        }
        destination.appendChild(boardListDiv)}
}









export {homeHeader, homeContent}