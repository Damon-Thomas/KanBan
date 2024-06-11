import {boardList, masterBoardNode} from './boardDOMmanagement.js';
import {createBoardModal, openModal} from "./boardmodal.js"
import { masterBoardContent } from './masterboardpage.js';

// Homepage Title Manager
function homeHeader() {
    const title = document.createElement('div');
    title.insertAdjacentHTML("afterbegin", "<h1>Kan<span class ='accent-title'>ban</span> Board</h1>");
    // title.innerHTML("<h1>Kan<span>ban</span> Board</h1>");
    title.classList.add('main-title');
    return title;
}

// Homepage Content Manager
function homeContent() {
    const homeDivContent = document.createElement('div')
    homeDivContent.classList.add('content-content')
    const homeDiv = document.createElement('div')
    homeDiv.classList.add("content")
    const makeBoardDiv = document.createElement('div')
    makeBoardDiv.classList.add('board-header-container')
    makeBoardDiv.appendChild(makeBoardButton())
    addMasterBoard(makeBoardDiv)
    homeDivContent.appendChild(makeBoardDiv)
    
    homeDivContent.appendChild(createBoardModal())
    addBoards(homeDivContent)
    homeDiv.appendChild(homeDivContent)
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

function addMasterBoard(destination) {
    destination.appendChild(masterBoardNode())}









export {homeHeader, homeContent}