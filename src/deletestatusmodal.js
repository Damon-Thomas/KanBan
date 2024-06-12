import CloseIcon from "./img/Cancel-Button.svg"
import { findBoardFromBoardName } from "./board.js"
import { deleteStatusButtonFunction } from "./status.js"



function createDialog(boardName) {
    const statusModalDialogue = document.createElement('dialog')
    statusModalDialogue.dataset.boardID = boardName
    statusModalDialogue.classList.add('modal')
    statusModalDialogue.id = 'delete-status'
    return statusModalDialogue
}
function makeStatusFormElement() {
    const createStatusForm = document.createElement('form')
    createStatusForm.id = "delete-status-form"
    return createStatusForm
}

function createExitButton()  {
    const exitButton = document.createElement('button')
    exitButton.classList.add("exit-button")
    exitButton.setAttribute("type", "button")
    exitButton.innerHTML = `<img src= ${CloseIcon} />`
    exitButton.setAttribute("name", "exit")
    exitButton.id = 'status-close-delete-modal'
    exitButton.addEventListener("click", function(event) {
        event.preventDefault();
        closeModal()
    })
    return exitButton
} 


// Create your task object form below
function createFormInput() {
    
    const taskInputDiv = document.createElement('div')
    taskInputDiv.classList.add("delete-status-input")
    const handlingInstructions = document.createElement('p')
    handlingInstructions.classList.add('modal-instruction')
    handlingInstructions.textContent = 'Any tasks left in this status will be deleted. Are you sure you would like to proceed?'

    taskInputDiv.appendChild(handlingInstructions)
    
    return taskInputDiv}

   

// submit for information
function createModalSubmitButton(boardName) {
    const deleteStatus = document.createElement('input')
    deleteStatus.setAttribute('type', 'submit')
    deleteStatus.setAttribute('form', 'delete-status-form')
    deleteStatus.setAttribute('name', 'delete-status')
    deleteStatus.setAttribute('value', 'Delete')
    deleteStatus.id = 'delete-status-button'

    // use submit button to create task object below
    deleteStatus.addEventListener("click", function(event) {
        event.preventDefault();
        const dialog = document.getElementById('delete-status')
        const statusActive = dialog.dataset.selectedStatus
        
        closeModal()
        deleteStatusButtonFunction(statusActive, findBoardFromBoardName(boardName))
        
    })
    return deleteStatus
}


// compile completed form
function fullForm(boardName) {
    const form = makeStatusFormElement()
    
    form.appendChild(createFormInput())
    form.appendChild(createExitButton())
    form.appendChild(createModalSubmitButton(boardName))
    return form
}


// put form in dialog and return dialog for use
function createDeleteStatusModal(boardName) {
    const dialog = createDialog(boardName)
    const form = fullForm(boardName)
    dialog.appendChild(form)
    
    return dialog
}

// dialog open controller
function openDeleteStatusModal(status) {
    const dialog = document.getElementById('delete-status')
    dialog.dataset.selectedStatus = status
    dialog.showModal()
}

// dialog close controller
function closeModal() {
    const dialog = document.getElementById('delete-status')
    const form = document.getElementById("delete-status-form")
    dialog.close();
    form.reset();
    
}


export {createDeleteStatusModal, openDeleteStatusModal}

