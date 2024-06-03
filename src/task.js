// ToDo - add creating task object on form submit. Get rid of one button and put a create task button on each status. 
// set status on which button was clicked. Look into drag and drop as a radio list could get too long nd break things.
// - When status is deleted add function to select which status to move all tasks to. Have a default selected, but offer to delete all tasks as well
// Drag and drop function to status list?
// 




function Task(title, description, deadline, priority, notes, checklist, status) {
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.notes = notes
    this.checklist = checklist
    this.status = status
  }

function createTask(board, status) {

}







// template for create task modal
import CloseIcon from "./img/Cancel-Button.svg"
import { updateBoardPage } from "./index.js"
import { addStatusToBoard } from "./board.js"
import { boards } from "./board.js";



function createDialog(boardName) {
    const taskModalDialogue = document.createElement('dialog')
    taskModalDialogue.dataset.taskID = boardName
    taskModalDialogue.classList.add('modal')
    taskModalDialogue.id = 'create-task'
    return taskModalDialogue
}
function makeTaskFormElement() {
    const createTaskForm = document.createElement('form')
    createTaskForm.id = "task-form"
    return createTaskForm
}

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
function createFormInput(boardName) {
    const taskInputDiv = document.createElement('div')
    taskInputDiv.classList.add("create-task-input")


    
    taskInputDiv.appendChild(createTextFormInput('Task-Name', "Task:"))
    taskInputDiv.appendChild(createTextFormInput('Task-Description', "Description:"))
    taskInputDiv.appendChild(createDateFormInput('Task-Deadline', "Deadline:"))
    taskInputDiv.appendChild(createPriorityRadioFormInput())
    taskInputDiv.appendChild(createTextFormInput('Task-Notes', "Note:"))
    taskInputDiv.appendChild(radioStatuses(boardName))
    

    return taskInputDiv}

function createTextFormInput(formLabel, userPrompt) {
  const createLabel = document.createElement('label')
  createLabel.setAttribute("for", formLabel)
  createLabel.textContent = userPrompt
  const createInput = document.createElement('input')
  createInput.setAttribute("type", "text")
  createInput.setAttribute("name", formLabel)
  createInput.id = formLabel
  const formDiv = document.createElement('div')
  formDiv.appendChild(createLabel)
  formDiv.appendChild(createInput)
  return formDiv
}

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

function createPriorityRadioFormInput() {
  const createFieldset = document.createElement('fieldset')
  const createLegend = document.createElement('legened')
  createLegend.textContent = "Select Task Priority"
  createFieldset.appendChild(createLegend)

  const createRadioOne = document.createElement('div')
  const createInput1 = document.createElement('input')
  createInput1.setAttribute("type", "radio")
  createInput1.setAttribute("name", "priority")
  createInput1.setAttribute('value', "High Priority")
  createInput1.id = "highPriority"
  const createLabel1 = document.createElement('label')
  createLabel1.setAttribute("for", 'highPriority')
  createLabel1.textContent = 'High Priority'
  createRadioOne.appendChild(createInput1)
  createRadioOne.appendChild(createLabel1)

  const createRadioTwo = document.createElement('div')
  const createInput2 = document.createElement('input')
  createInput2.setAttribute("type", "radio")
  createInput2.setAttribute("name", "priority")
  createInput2.setAttribute('value', "Medium Priority")
  createInput2.id = "mediumPriority"
  const createLabel2 = document.createElement('label')
  createLabel2.setAttribute("for", 'mediumPriority')
  createLabel2.textContent = 'Medium Priority'
  createRadioOne.appendChild(createInput2)
  createRadioOne.appendChild(createLabel2)

  const createRadioThree = document.createElement('div')
  const createInput3 = document.createElement('input')
  createInput3.setAttribute("type", "radio")
  createInput3.setAttribute("name", "priority")
  createInput3.setAttribute('value', "Low Priority")
  createInput3.id = "lowPriority"
  createInput3.setAttribute('checked', true)
  const createLabel3 = document.createElement('label')
  createLabel3.setAttribute("for", 'lowPriority')
  createLabel3.textContent = 'Low Priority'
  createRadioOne.appendChild(createInput3)
  createRadioOne.appendChild(createLabel3)



  
  createFieldset.appendChild(createRadioOne)
  createFieldset.appendChild(createRadioTwo)
  createFieldset.appendChild(createRadioThree)
  
  return createFieldset
}

function radioStatuses(boardName){
  const createFieldset = document.createElement('fieldset')
  const createLegend = document.createElement('legened')
  createLegend.textContent = "Select Current Status"
  createFieldset.appendChild(createLegend)
  let activeBoard = ''
  for (let i = 0;i < boards.length;i++) {   
    if (boardName === boards[i]["name"]) {
        activeBoard = boards[i]
        for (let i = 0; i < activeBoard['statuses'].length; i++){
          let idValue = activeBoard['statuses'][i]
          idValue = idValue.replace(/\s+/g, '');
          createFieldset.appendChild(radioButton(idValue, activeBoard['statuses'][i]))
      }
    }
}
  return createFieldset
}



function radioButton(name, value,){
  const createRadioButton = document.createElement('div')
  const createInput = document.createElement('input')
  createInput.setAttribute("type", "radio")
  createInput.setAttribute("name", "status")
  createInput.setAttribute('value', value)
  createInput.id = name
  const createLabel = document.createElement('label')
  createLabel.setAttribute("for", name)
  createLabel.textContent = value
  createRadioButton.appendChild(createInput)
  createRadioButton.appendChild(createLabel)
  return createRadioButton
}





function createModalSubmitButton(boardName) {
    const submitTask = document.createElement('input')
    submitTask.setAttribute('type', 'submit')
    submitTask.setAttribute('form', 'task-form')
    submitTask.setAttribute('name', 'create-task')
    submitTask.setAttribute('value', 'Create Task')
    submitTask.id = 'submit-Task'

    // use submit button to create task object below
    submitTask.addEventListener("click", function(event) {
        console.log(boardName)
        event.preventDefault();
        const taskInput = document.querySelector('#Task-Name')
        console.log(taskInput.value)

        addTaskToBoard(boardName, taskInput.value)
        updateBoardPage(boardName)
    })
    return submitTask
}








function fullForm(boardName) {
    const form = makeTaskFormElement()
    const exit = createExitButton()
    const input = createFormInput(boardName)
    const submit = createModalSubmitButton(boardName)
    form.appendChild(exit)
    form.appendChild(input)
    form.appendChild(submit)
    return form
}



function createTaskModal(boardName) {
    const dialog = createDialog(boardName)
    const form = fullForm(boardName)
    dialog.appendChild(form)
    
    return dialog
}

function openTaskModal() {
    const dialog = document.getElementById('create-task')
    dialog.showModal()
}

function closeModal() {
    const dialog = document.getElementById('create-task')
    const form = document.getElementById("task-form")
    dialog.close();
    form.reset()
}

export {createTaskModal, openTaskModal}