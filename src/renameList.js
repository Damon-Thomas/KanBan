import {createStatusModal, openModal} from './statusModal'
import {boards} from "./board.js"

function statusHandler(boardName) {
    console.log(boardName)
    let activeBoard = ''
    for (let i = 0;i < boards.length - 1;i++) {
        console.log('fire')
        if (boardName === boards[i]["name"]) {
            console.log('inside if')
            activeBoard = boards[i]
            console.log(activeBoard['statuses'])
        }
    }
    const statusCollection = document.createElement('div')
    statusCollection.classList.add('status-container')
    console.log(activeBoard['statuses'])
    for (let i = 0; i < activeBoard['statuses'].length; i++){
        statusCollection.appendChild(createStatus(activeBoard['statuses'][i]))
    }
    statusCollection.appendChild(statusCreationButton())
    return statusCollection
    


}


function createStatus(name) {
    const statusContainer = document.createElement('div')
    statusContainer.classList.add('status-column')
    statusContainer.dataset.statusName = name
    const statusContainerTitle = document.createElement('h4')
    statusContainerTitle.textContent = name
    statusContainer.appendChild(statusContainerTitle)
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

export {statusHandler}
