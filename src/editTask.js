import CloseIcon from "./img/Cancel-Button.svg"
import { updateBoardPage, updateMasterBoardPage } from "./index.js"
import { Task } from "./board.js";
import { replaceTask } from "./board.js";


// make dialog to control form as modal
function createDialog(boardName) {
    const taskModalDialogue = document.createElement('dialog')
    taskModalDialogue.dataset.taskID = boardName
    taskModalDialogue.classList.add('modal')
    taskModalDialogue.id = 'edit-task'
    return taskModalDialogue
}

// make form to store user input nodes
function makeTaskFormElement() {
    const createTaskForm = document.createElement('form')
    createTaskForm.id = "edittask-form"
    return createTaskForm
}

// exit button with image to close and reset modal
function createExitButton(boardName, task)  {
    const exitButton = document.createElement('button')
    exitButton.classList.add("exit-button")
    exitButton.setAttribute("type", "button")
    exitButton.innerHTML = `<img src= ${CloseIcon} />`
    exitButton.setAttribute("name", "exit")
    exitButton.id = 'task-close-modal'
    exitButton.addEventListener("click", function(event) {
        event.preventDefault();
        closeModal(boardName, task)
    })
    return exitButton
} 

// Create your task object form below
function createFormInput(task) {
    const taskInputDiv = document.createElement('div')
    taskInputDiv.classList.add("edit-task-input")

    taskInputDiv.appendChild(noLabelInput('Edit-Task-Name', task.title))
    taskInputDiv.appendChild(createTextAreaFormInput('Edit-Task-Description', "Description:", task.description))
    
    taskInputDiv.appendChild(createDateFormInput('Edit-Task-Deadline', "Deadline:", task.deadline))
    taskInputDiv.appendChild(createPriorityRadioFormInput(task.priority))
    taskInputDiv.appendChild(createTextAreaFormInput('Edit-Task-Notes', "Note:", task.notes))
    
    return taskInputDiv}

function noLabelInput(formLabel, taskValue) {
  const createInput = document.createElement('input')
  createInput.setAttribute("type", "text")
  createInput.setAttribute("maxlength", "25")
  createInput.setAttribute("name", formLabel)
  createInput.id = formLabel
  createInput.value = taskValue
  const formDiv = document.createElement('div')
  formDiv.classList.add("edit-title-input")
  formDiv.appendChild(createInput)
  return formDiv

}

function createTextAreaFormInput(formLabel, userPrompt, taskValue) {
  const createLabel = document.createElement('label')
  createLabel.setAttribute("for", formLabel)
  createLabel.textContent = userPrompt
  const createInput = document.createElement('textarea')
  createInput.setAttribute("type", "text")
  createInput.setAttribute("name", formLabel)
  createInput.setAttribute("rows", 3)
  createInput.setAttribute("cols", 40)
  createInput.id = formLabel
  createInput.value = taskValue
  const formDiv = document.createElement('div')
  formDiv.appendChild(createLabel)
  formDiv.appendChild(createInput)
  return formDiv
}

// template for date inputs
function createDateFormInput(formLabel, userPrompt, taskValue) {
  const createLabel = document.createElement('label')
  createLabel.setAttribute("for", formLabel)
  createLabel.textContent = userPrompt
  const createInput = document.createElement('input')
  createInput.setAttribute("type", "date")
  createInput.setAttribute("name", formLabel)
  createInput.id = formLabel
  createInput.value = taskValue
  const formDiv = document.createElement('div')
  formDiv.appendChild(createLabel)
  formDiv.appendChild(createInput)
  return formDiv
}

// priority radio buttons
function createPriorityRadioFormInput(taskValue) {
  const createFieldset = document.createElement('fieldset')
  const createLegend = document.createElement('legend')
  createLegend.textContent = "Select Task Priority"
  createFieldset.appendChild(createLegend)

  const createRadioOne = document.createElement('div')
  const createInput1 = document.createElement('input')
  createInput1.setAttribute("type", "radio")
  createInput1.setAttribute("name", "edit-priority")
  createInput1.setAttribute('value', "High")
  createInput1.id = "highPriority"
  if(taskValue === "High"){
    createInput1.setAttribute('checked', true)
  }
 
  const createLabel1 = document.createElement('label')
  createLabel1.setAttribute("for", 'highPriority')
  createLabel1.textContent = 'High'
  createRadioOne.appendChild(createInput1)
  createRadioOne.appendChild(createLabel1)

  const createRadioTwo = document.createElement('div')
  const createInput2 = document.createElement('input')
  createInput2.setAttribute("type", "radio")
  createInput2.setAttribute("name", "edit-priority")
  createInput2.setAttribute('value', "Medium")
  createInput2.id = "mediumPriority"
  if(taskValue === "Medium"){
    createInput2.setAttribute('checked', true)
  }
  
  const createLabel2 = document.createElement('label')
  createLabel2.setAttribute("for", 'mediumPriority')
  createLabel2.textContent = 'Medium'
  createRadioTwo.appendChild(createInput2)
  createRadioTwo.appendChild(createLabel2)

  const createRadioThree = document.createElement('div')
  const createInput3 = document.createElement('input')
  createInput3.setAttribute("type", "radio")
  createInput3.setAttribute("name", "edit-priority")
  createInput3.setAttribute('value', "Low")
  createInput3.id = "lowPriority"
  if(taskValue === "Low"){
    createInput3.setAttribute('checked', true)
  }
  
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
function createModalSubmitButton(boardName, task) {
    const saveTask = document.createElement('input')
    saveTask.setAttribute('type', 'submit')
    saveTask.setAttribute('form', 'edittask-form')
    saveTask.setAttribute('name', 'edit-task')
    saveTask.setAttribute('value', 'Save')
    saveTask.id = 'submit-Task'

    // use submit button to create task object below
    saveTask.addEventListener("click", function(event) {
        event.preventDefault();


        
        const taskNameInput = document.querySelector('#Edit-Task-Name')
        if (taskNameInput.value === "") {
            taskNameInput.classList.add('required')
            return
        }
        const descriptionInput = document.querySelector("#Edit-Task-Description").value
        const deadlineInput = document.querySelector("#Edit-Task-Deadline").value

      

        const priority = document.querySelector('input[name="edit-priority"]:checked').value;
        
        const noteInput = document.querySelector("#Edit-Task-Notes").value
        const dialog = document.querySelector("#edit-task")
        const statusActive = dialog.dataset.selectedStatus
        
        
        const newtask = new Task(taskNameInput.value, descriptionInput, deadlineInput, priority, noteInput, statusActive)
        replaceTask(task, newtask, boardName)
        closeModal(boardName, task)
        
        
        if (document.getElementById('master-board-title') === null) {
          updateBoardPage(boardName)
        }
        else {
          updateMasterBoardPage()
        }
        
        
    })
    return saveTask
}


// compile completed form
function fullForm(boardName, task) {
    const form = makeTaskFormElement()
    const exit = createExitButton(boardName, task)
    const input = createFormInput(task)
    const submit = createModalSubmitButton(boardName, task)
    form.appendChild(exit)
    form.appendChild(input)
    form.appendChild(submit)
    return form
}


// put form in dialog and return dialog for use
function createEditTaskModal(boardName, task) {
    const dialog = createDialog(boardName)
    const form = fullForm(boardName, task)
    dialog.appendChild(form)
    
    return dialog
}

// dialog open controller
function openEditTaskModal(status) {
    const dialog = document.getElementById('edit-task')
    dialog.dataset.selectedStatus = status
    dialog.showModal()
}

// dialog close controller
function closeModal(boardName, task) {
    const dialog = document.getElementById('edit-task')
    const form = document.getElementById("edittask-form")
    dialog.close();
    form.innerHTML = ""
    form.appendChild(fullForm(boardName, task))
    updateScreen(boardName)
    
}

function updateScreen(boardName) {
  if (document.getElementById('master-board-title') === null) {
    updateBoardPage(boardName)
  }
  else {
    updateMasterBoardPage()
  }
  
}

// exporting created dialog and open controller
export {createEditTaskModal, openEditTaskModal}