import CloseIcon from "./img/Cancel-Button.svg"
import {createNewBoard} from "./board.js"
import { updatePage } from "./index.js"

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
        updatePage()
    })
    return submitBoard
}

function fullForm() {
    const form = makeBoardFormElement()
    const exit = createExitButton()
    const input = createFormInput()
    const submit = createModalSubmitButton()
    form.appendChild(exit)
    form.appendChild(input)
    form.appendChild(submit)
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