import { createStatusModal } from "./statusModal.js";
import {statusHandler} from "./status.js"
import { updateHomePage } from "./index.js";
import {createTaskModal, openTaskModal} from "./masterTaskModal.js"


function boardHeader(boardName) {
    const headerDiv = document.createElement('div')
    headerDiv.classList.add("board-header")
    
    const emptyDiv = document.createElement('div')
    emptyDiv.classList.add("right-board-header")
    headerDiv.appendChild(returnHome())
    headerDiv.appendChild(boardTitle(boardName))
    headerDiv.appendChild(emptyDiv)
    return headerDiv;
}
function boardContent(boardName) {
    const boardDiv = document.createElement('div')
    boardDiv.classList.add("board-content")
    boardDiv.appendChild(statusHandler(boardName))
    boardDiv.appendChild(createStatusModal(boardName))
    boardDiv.appendChild(createTaskModal(boardName))
    
    return boardDiv
}

function returnHome(){
    const homeButton = document.createElement('button')
    const homeDiv = document.createElement('div')
    homeDiv.classList.add("left-board-header")
    homeButton.textContent = 'Home'
    homeButton.classList.add('home-button')
    homeButton.addEventListener("click", updateHomePage)
    homeDiv.appendChild(homeButton)
    return homeDiv
}

function boardTitle(boardName){
    const title = document.createElement('h1');
    title.textContent = boardName;
    title.classList.add('board-title');
    return title
}
export {boardContent, boardHeader}