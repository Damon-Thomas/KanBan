import CloseIcon from "./img/Cancel-Button.svg"
import {createNewBoard} from "./boardDOMmanagement.js"
import { updateHomePage } from "./index.js"

function createDialog() {
    const boardModalDialogue = document.createElement('dialog')
    boardModalDialogue.classList.add('modal')
    boardModalDialogue.id = 'create-board'
    return boardModalDialogue
}

function makeBoardFormElement() {
    const createBoardForm = document.createElement('form')
    createBoardForm.id = "form"
    return createBoardForm
}

function createModalTitle(){
    
    const title = document.createElement('h2')
    title.textContent = "Create New Board"
    title.classList.add('modal-title')
    
    return title
}

function createExitButton()  {
    const exitButton = document.createElement('button')
    exitButton.classList.add("exit-button")
    exitButton.setAttribute("type", "button")
    exitButton.innerHTML = `<img src= ${CloseIcon} />`
    exitButton.setAttribute("name", "exit")
    exitButton.id = 'close-modal'
    exitButton.addEventListener("click", function(event) {
        event.preventDefault();
        closeModal()
    })
    return exitButton
} 

function createFormInput() {
    const boardInputDiv = document.createElement('div')
    boardInputDiv.classList.add("create-board-input")
    const createBoardLabel = document.createElement('label')
    createBoardLabel.setAttribute("for", "Board-Name")
    createBoardLabel.textContent = "Board Name:"
    const createBoardInput = document.createElement('input')
    createBoardInput.setAttribute("type", "text")
    createBoardInput.setAttribute("name", "Board-Name")
    createBoardInput.id = "Board-Name"
    boardInputDiv.appendChild(createBoardLabel)
    boardInputDiv.appendChild(createBoardInput)
    return boardInputDiv}

function createModalSubmitButton() {
    const submitBoard = document.createElement('input')
    submitBoard.setAttribute('type', 'submit')
    submitBoard.setAttribute('form', 'form')
    submitBoard.setAttribute('name', 'create-board')
    submitBoard.setAttribute('value', 'Create Board')
    submitBoard.id = 'submit-board'
    submitBoard.addEventListener("click", function(event) {
        event.preventDefault();
        const boardInput = document.querySelector('#Board-Name')
        createNewBoard(boardInput.value)
        updateHomePage()
    })
    return submitBoard
}

function fullForm() {
    const form = makeBoardFormElement()
    form.appendChild(createExitButton())
    form.appendChild(createModalTitle())
    form.appendChild(createFormInput())
    form.appendChild(createModalSubmitButton())
    return form
}



function createBoardModal() {
    const dialog = createDialog()
    const form = fullForm()
    dialog.appendChild(form)
    
    return dialog
}

function openModal() {
    const dialog = document.getElementById('create-board')
    dialog.showModal()
}

function closeModal() {
    const dialog = document.getElementById('create-board')
    const form = document.getElementById("form")
    dialog.close();
    form.reset()
}
        
export {createBoardModal, openModal}