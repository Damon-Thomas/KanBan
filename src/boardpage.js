import { createStatusModal } from "./statusModal.js";
import {statusHandler} from "./renameList.js"


function boardHeader(boardName) {
    const title = document.createElement('h1');
    title.textContent = boardName;
    title.classList.add('board-title');
    return title;
}
function boardContent(boardName) {
    const boardDiv = document.createElement('div')
    boardDiv.classList.add("board-content")
    boardDiv.appendChild(statusHandler(boardName))
    boardDiv.appendChild(createStatusModal(boardName))
    
    return boardDiv
}

export {boardContent, boardHeader}