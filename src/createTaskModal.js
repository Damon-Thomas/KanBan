import CloseIcon from "./img/Cancel-Button.svg"
import { updateBoardPage } from "./index.js"
import { addTaskToBoard } from "./board.js"
import { Task } from "./board.js";


// make dialog to control form as modal
function createDialog(boardName) {
    const taskModalDialogue = document.createElement('dialog')
    taskModalDialogue.dataset.taskID = boardName
    taskModalDialogue.classList.add('modal')
    taskModalDialogue.id = 'create-task'
    return taskModalDialogue
}

// make form to store user input nodes
function makeTaskFormElement() {
    const createTaskForm = document.createElement('form')
    createTaskForm.id = "task-form"
    return createTaskForm
}

// exit button with image to close and reset modal
function createExitButton()  {
    const exitButton = document.createElement('button')
    exitButton.classList.add("exit-button")
    exitButton.setAttribute("type", "button")
    exitButton.innerHTML = `<img src= ${CloseIcon} />`
    exitButton.setAttribute("name", "exit")
    exitButton.id = 'task-close-modal'
    exitButton.addEventListener("click", function(event) {
        event.preventDefault();
        closeModal()
    })
    return exitButton
} 

// Create your task object form below
function createFormInput() {
    const taskInputDiv = document.createElement('div')
    taskInputDiv.classList.add("create-task-input")

    taskInputDiv.appendChild(createTextFormInput('Task-Name', "Task*:"))
    taskInputDiv.appendChild(createTextAreaFormInput('Task-Description', "Description:"))
    taskInputDiv.appendChild(createDateFormInput('Task-Deadline', "Deadline:"))
    taskInputDiv.appendChild(createPriorityRadioFormInput())
    taskInputDiv.appendChild(createTextAreaFormInput('Task-Notes', "Note:"))
    
    return taskInputDiv}

    // template for text inputs
function createTextFormInput(formLabel, userPrompt) {
  const createLabel = document.createElement('label')
  createLabel.setAttribute("for", formLabel)
  createLabel.textContent = userPrompt
  const createInput = document.createElement('input')
  createInput.setAttribute("type", "text")
  createInput.required = true
  createInput.setAttribute("minlength", "1")
  createInput.setAttribute("maxlength", "25")
  createInput.setAttribute("name", formLabel)
  createInput.id = formLabel
  const formDiv = document.createElement('div')
  formDiv.appendChild(createLabel)
  formDiv.appendChild(createInput)
  return formDiv
}

function createTextAreaFormInput(formLabel, userPrompt) {
    const createLabel = document.createElement('label')
    createLabel.setAttribute("for", formLabel)
    createLabel.textContent = userPrompt
    const createInput = document.createElement('textarea')
    createInput.setAttribute("type", "text")
    createInput.setAttribute("name", formLabel)
    createInput.setAttribute("rows", 3)
    createInput.setAttribute("cols", 40)
    createInput.id = formLabel
    const formDiv = document.createElement('div')
    formDiv.appendChild(createLabel)
    formDiv.appendChild(createInput)
    return formDiv
  }

// template for date inputs
function createDateFormInput(formLabel, userPrompt) {
  const createLabel = document.createElement('label')
  createLabel.setAttribute("for", formLabel)
  createLabel.textContent = userPrompt
  const createInput = document.createElement('input')
  createInput.setAttribute("type", "date")
  createInput.setAttribute("name", formLabel)
  createInput.id = formLabel
  const formDiv = document.createElement('div')
  formDiv.appendChild(createLabel)
  formDiv.appendChild(createInput)
  return formDiv
}

// priority radio buttons
function createPriorityRadioFormInput() {
  const createFieldset = document.createElement('fieldset')
  const createLegend = document.createElement('legend')
  createLegend.textContent = "Select Task Priority"
  createFieldset.appendChild(createLegend)

  const createRadioOne = document.createElement('div')
  const createInput1 = document.createElement('input')
  createInput1.setAttribute("type", "radio")
  createInput1.setAttribute("name", "priority")
  createInput1.setAttribute('value', "High")
  createInput1.id = "highPriority"
  const createLabel1 = document.createElement('label')
  createLabel1.setAttribute("for", 'highPriority')
  createLabel1.textContent = 'High'
  createRadioOne.appendChild(createInput1)
  createRadioOne.appendChild(createLabel1)

  const createRadioTwo = document.createElement('div')
  const createInput2 = document.createElement('input')
  createInput2.setAttribute("type", "radio")
  createInput2.setAttribute("name", "priority")
  createInput2.setAttribute('value', "Medium")
  createInput2.id = "mediumPriority"
  const createLabel2 = document.createElement('label')
  createLabel2.setAttribute("for", 'mediumPriority')
  createLabel2.textContent = 'Medium'
  createRadioTwo.appendChild(createInput2)
  createRadioTwo.appendChild(createLabel2)

  const createRadioThree = document.createElement('div')
  const createInput3 = document.createElement('input')
  createInput3.setAttribute("type", "radio")
  createInput3.setAttribute("name", "priority")
  createInput3.setAttribute('value', "Low")
  createInput3.id = "lowPriority"
  createInput3.setAttribute('checked', true)
  const createLabel3 = document.createElement('label')
  createLabel3.setAttribute("for", 'lowPriority')
  createLabel3.textContent = 'Low'
  createRadioThree.appendChild(createInput3)
  createRadioThree.appendChild(createLabel3)



  
  createFieldset.appendChild(createRadioOne)
  createFieldset.appendChild(createRadioTwo)
  createFieldset.appendChild(createRadioThree)
  
  return createFieldset
}




// submit for information
function createModalSubmitButton(boardName) {
    const submitTask = document.createElement('input')
    submitTask.setAttribute('type', 'submit')
    submitTask.setAttribute('form', 'task-form')
    submitTask.setAttribute('name', 'create-task')
    submitTask.setAttribute('value', 'Create Task')
    submitTask.id = 'submit-Task'

    // use submit button to create task object below
    submitTask.addEventListener("click", function(event) {
         
        event.preventDefault();


        const taskNameInput = document.querySelector('#Task-Name')
        if (taskNameInput.value === "") {
            taskNameInput.classList.add('required')
            return
        }
        const descriptionInput = document.querySelector("#Task-Description").value
        const deadlineInput = document.querySelector("#Task-Deadline").value
        

        

        

        const priority = document.querySelector('input[name="priority"]:checked').value;
        
        const noteInput = document.querySelector("#Task-Notes").value
        const dialog = document.querySelector("#create-task")
        const statusActive = dialog.dataset.selectedStatus
        
        
        const task = new Task(taskNameInput.value, descriptionInput, deadlineInput, priority, noteInput, statusActive)
        closeModal()
        addTaskToBoard(boardName, task)
        updateBoardPage(boardName)
        
    })
    return submitTask
}


// compile completed form
function fullForm(boardName, task) {
    const form = makeTaskFormElement()
    const exit = createExitButton()
    const input = createFormInput()//boardName, task
    const submit = createModalSubmitButton(boardName)
    form.appendChild(exit)
    form.appendChild(input)
    form.appendChild(submit)
    return form
}


// put form in dialog and return dialog for use
function createTaskModal(boardName) {
    const dialog = createDialog(boardName)
    const form = fullForm(boardName)
    dialog.appendChild(form)
    
    return dialog
}

// dialog open controller
function openTaskModal(status) {

    const dialog = document.getElementById('create-task')
    dialog.dataset.selectedStatus = status
    dialog.showModal()
}

// dialog close controller
function closeModal() {
    const dialog = document.getElementById('create-task')
    const form = document.getElementById("task-form")
    dialog.close();
    form.reset()
}

// exporting created dialog and open controller
export {createTaskModal, openTaskModal}