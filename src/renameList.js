import {createStatusModal, openModal} from './statusModal'
import {boards} from "./board.js"
import { updateBoardPage } from './index.js'
import { openTaskModal } from './task.js'

function statusHandler(boardName) {
    
    let activeBoard = ''
    const statusCollection = document.createElement('div')
    statusCollection.classList.add('status-container')
    
    for (let i = 0;i < boards.length;i++) {
        
        if (boardName === boards[i]["name"]) {
            
            activeBoard = boards[i]
            
            for (let i = 0; i < activeBoard['statuses'].length; i++){
                statusCollection.appendChild(createStatus(activeBoard['statuses'][i], activeBoard))
            }
        }
        }
    statusCollection.appendChild(statusCreationButton())
    statusCollection.appendChild(taskCreationButton())
    
    
    return statusCollection
}




function createStatus(name, board) {
    const statusContainer = document.createElement('div')
    statusContainer.classList.add('status-column')
    statusContainer.dataset.statusName = name
    const statusContainerTitle = document.createElement('h4')
    statusContainerTitle.textContent = name
    statusContainer.appendChild(statusContainerTitle)
    const deleteStatus = document.createElement('button')
    deleteStatus.classList.add('delete-status-button')
    deleteStatus.textContent = 'Remove Status'
    deleteStatus.addEventListener("click", function(){
        
        for (let i = 0; i < board['statuses'].length; i++){
            if (board['statuses'][i] === name) {
                let index = board['statuses'].indexOf(name)
                board['statuses'].splice(index, 1)
            }
        }
        updateBoardPage(board['name'])
    } )
    statusContainer.appendChild(deleteStatus)
    return statusContainer
}

function statusCreationButton() {
    const createStatusButton = document.createElement('button')
    createStatusButton.classList.add('create-status-button')
    createStatusButton.textContent = 'Add New Status'
    createStatusButton.addEventListener("click", function(){
        openModal()
    })
    return createStatusButton
}

function taskCreationButton() {
    const createTaskButton = document.createElement('button')
    createTaskButton.classList.add('create-task-button')
    createTaskButton.textContent = 'Add New Task'
    createTaskButton.addEventListener("click", function(){
        openTaskModal()
    })
    return createTaskButton
}



export {statusHandler}
