import { createStatusModal } from "./statusModal.js";
import {masterHandler, statusHandler} from "./status.js"
import { updateHomePage, updateMasterBoardPage } from "./index.js";
import {createTaskModal} from "./createTaskModal.js"
import { createDeleteStatusModal } from "./deletestatusmodal.js";
import { returnHome } from "./boardpage.js";
import calender from "./img/calendar.svg"
import upArrow from "./img/arrow-up.svg"
import downArrow from "./img/arrow-down.svg"
import { ascendingDomHandler, descendingDomHandler } from "./dateHandler.js";

// header containing home button and board title
function MasterBoardHeader() {
    const headerDiv = document.createElement('div')
    headerDiv.classList.add("board-header")
    
    const emptyDiv = document.createElement('div')
    emptyDiv.classList.add("right-board-header")
    const headerLeft = document.createElement('div')
    headerLeft.classList.add("left-board-header")
    headerLeft.appendChild(returnHome())
    headerLeft.appendChild(masterBoardDateSort())
    headerDiv.appendChild(headerLeft)
    headerDiv.appendChild(masterBoardTitle())
    headerDiv.appendChild(emptyDiv)
    return headerDiv;
}

// create content div and add - status div + status modal + task modal
function masterBoardContent() {
    const boardDiv = document.createElement('div')
    boardDiv.classList.add("master-board-content")
    boardDiv.appendChild(masterHandler())
    
    
    return boardDiv
}

// create board title heading
function masterBoardTitle(){
    const title = document.createElement('h1');
    title.textContent = "Master Board";
    title.classList.add('board-title');
    title.id = "master-board-title"
    return title
}

function masterBoardDateSort() {
    const dateSort = document.createElement('div')
    dateSort.classList.add('date-sort')
    dateSort.classList.add('default')
    dateSort.innerHTML = `<img src= ${calender} />`
    dateSort.addEventListener("click", function() {
        if (dateSort.classList.contains('default')) {
            dateSort.innerHTML = `<img src= ${calender} /><img src= ${upArrow} /> `
            dateSort.classList.replace('default', 'ascending')
            ascendingDomHandler()
        }
        else if (dateSort.classList.contains('ascending')) {
            dateSort.innerHTML = `<img src= ${calender} /><img src= ${downArrow} /> `
            dateSort.classList.replace('ascending', 'descending')
            descendingDomHandler()
        }
        else {
            updateMasterBoardPage()
        }
    })
    return dateSort
}

export {masterBoardContent, MasterBoardHeader}