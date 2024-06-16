import { createStatusModal } from "./statusModal.js";
import {statusHandler} from "./status.js"
import { updateHomePage } from "./index.js";
import {createTaskModal} from "./createTaskModal.js"
import { createDeleteStatusModal } from "./deletestatusmodal.js";
import HomeIcon from "./img/home.svg"

// header containing home button and board title
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

// create content div and add - status div + status modal + task modal
function boardContent(boardName) {
    const boardDiv = document.createElement('div')
    boardDiv.classList.add("board-content")
    boardDiv.appendChild(statusHandler(boardName))
    boardDiv.appendChild(createStatusModal(boardName))
    boardDiv.appendChild(createTaskModal(boardName))
    boardDiv.appendChild(createDeleteStatusModal(boardName))
    
    return boardDiv
}

// load homepage
function returnHome(){
    const homeButton = document.createElement('p')
    const homeDiv = document.createElement('div')
    
    homeButton.textContent = 'Home'
    homeDiv.innerHTML = `<img src= ${HomeIcon} />`
    homeDiv.classList.add('home-button')
    homeDiv.addEventListener("click", updateHomePage)
    homeDiv.appendChild(homeButton)
    return homeDiv
}

// create board title heading
function boardTitle(boardName){
    const title = document.createElement('h1');
    title.textContent = boardName;
    title.classList.add('board-title');
    return title
}

export {boardContent, boardHeader, returnHome}