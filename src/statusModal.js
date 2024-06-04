import CloseIcon from "./img/Cancel-Button.svg"
import { updateBoardPage } from "./index.js"
import { addStatusToBoard } from "./board.js"



function createDialog(boardName) {
    const statusModalDialogue = document.createElement('dialog')
    statusModalDialogue.dataset.boardID = boardName
    statusModalDialogue.classList.add('modal')
    statusModalDialogue.id = 'create-status'
    return statusModalDialogue
}
function makeStatusFormElement() {
    const createStatusForm = document.createElement('form')
    createStatusForm.id = "status-form"
    return createStatusForm
}

function createExitButton()  {
    const exitButton = document.createElement('button')
    exitButton.classList.add("exit-button")
    exitButton.setAttribute("type", "button")
    exitButton.innerHTML = `<img src= ${CloseIcon} />`
    exitButton.setAttribute("name", "exit")
    exitButton.id = 'status-close-modal'
    exitButton.addEventListener("click", function(event) {
        event.preventDefault();
        closeModal()
    })
    return exitButton
} 

function createFormInput() {
    const statusInputDiv = document.createElement('div')
    statusInputDiv.classList.add("create-status-input")
    const createStatusLabel = document.createElement('label')
    createStatusLabel.setAttribute("for", "Status-Name")
    createStatusLabel.textContent = "Status Label:"
    const createStatusInput = document.createElement('input')
    createStatusInput.setAttribute("type", "text")
    createStatusInput.setAttribute("name", "Status-Name")
    createStatusInput.id = "Status-Name"
    statusInputDiv.appendChild(createStatusLabel)
    statusInputDiv.appendChild(createStatusInput)
    return statusInputDiv}

function createModalSubmitButton(boardName) {
    const submitStatus = document.createElement('input')
    submitStatus.setAttribute('type', 'submit')
    submitStatus.setAttribute('form', 'status-form')
    submitStatus.setAttribute('name', 'create-status')
    submitStatus.setAttribute('value', 'Create Status')
    submitStatus.id = 'submit-status'
    submitStatus.addEventListener("click", function(event) {
        console.log(boardName)
        event.preventDefault();
        const statusInput = document.querySelector('#Status-Name')
        console.log(statusInput.value)
        addStatusToBoard(boardName, statusInput.value)
        updateBoardPage(boardName)
    })
    return submitStatus
}

function fullForm(boardName) {
    const form = makeStatusFormElement()
    const exit = createExitButton()
    const input = createFormInput()
    const submit = createModalSubmitButton(boardName)
    form.appendChild(exit)
    form.appendChild(input)
    form.appendChild(submit)
    return form
}



function createStatusModal(boardName) {
    const dialog = createDialog(boardName)
    const form = fullForm(boardName)
    dialog.appendChild(form)
    
    return dialog
}

function openModal() {
    const dialog = document.getElementById('create-status')
    dialog.showModal()
}

function closeModal() {
    const dialog = document.getElementById('create-status')
    const form = document.getElementById("status-form")
    dialog.close();
    form.reset()
}

export {createStatusModal, openModal}