import { createStatusModal } from "./statusModal.js";
import {masterHandler, statusHandler} from "./status.js"
import { updateHomePage } from "./index.js";
import {createTaskModal} from "./createTaskModal.js"
import { createDeleteStatusModal } from "./deletestatusmodal.js";

// header containing home button and board title
function MasterBoardHeader() {
    const headerDiv = document.createElement('div')
    headerDiv.classList.add("board-header")
    
    const emptyDiv = document.createElement('div')
    emptyDiv.classList.add("right-board-header")
    headerDiv.appendChild(returnHome())
    headerDiv.appendChild(masterBoardTitle())
    headerDiv.appendChild(emptyDiv)
    return headerDiv;
}

// create content div and add - status div + status modal + task modal
function masterBoardContent() {
    const boardDiv = document.createElement('div')
    boardDiv.classList.add("board-content")
    boardDiv.appendChild(masterHandler())
    
    
    return boardDiv
}

// load homepage
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

// create board title heading
function masterBoardTitle(){
    const title = document.createElement('h1');
    title.textContent = "Master Board";
    title.classList.add('board-title');
    title.id = "master-board-title"
    return title
}

export {masterBoardContent, MasterBoardHeader}