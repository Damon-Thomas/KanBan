import CloseIcon from "./img/Cancel-Button.svg"

// 
// 
// universal across modals
function createDialog(id, boardName = "") {
    const ModalDialogue = document.createElement('dialog')
    ModalDialogue.dataset.boardID = boardName
    ModalDialogue.classList.add('modal')
    ModalDialogue.id = id
    return ModalDialogue
}

function makeFormElement(type) {
    const createForm = document.createElement('form')
    createForm.id = `${type}-form`
    return createForm
}

function createExitButton()  {
    const exitButton = document.createElement('button')
    exitButton.classList.add("exit-button")
    exitButton.setAttribute("type", "button")
    exitButton.innerHTML = `<img src= ${CloseIcon} />`
    exitButton.setAttribute("name", "exit")
    // exitButton.id = 'close-modal'
    // removing id shouldn't affect anything but leaving in case until verified
    exitButton.addEventListener("click", function(event) {
        event.preventDefault();
        closeModal()
    })
    return exitButton
} 

function fullForm(modalInput, modalSubmit, boardName, task) {
    const form = makeTaskFormElement()
    form.appendChild(createExitButton())
    form.appendChild(modalInput(task))
    form.appendChild(modalSubmit(boardName, task))
    return form
}

function createModal(modalInput, modalSubmit, id, boardName, task) {
    const dialog = createDialog(id, boardName)
    const form = fullForm(modalInput, modalSubmit, boardName, task)
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
function closeModal() {
    const dialog = document.getElementById('edit-task')
    const form = document.getElementById("task-form")
    dialog.close();
    form.reset()
}






// 
// 
// change based on modal

// inputs

// 
// create board
// 
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






// 
// create status
// 
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







// 
//create Task
// 
function createFormInput() {
    const taskInputDiv = document.createElement('div')
    taskInputDiv.classList.add("create-task-input")

    taskInputDiv.appendChild(createTextFormInput('Task-Name', "Task:"))
    taskInputDiv.appendChild(createTextFormInput('Task-Description', "Description:"))
    taskInputDiv.appendChild(createDateFormInput('Task-Deadline', "Deadline:"))
    taskInputDiv.appendChild(createPriorityRadioFormInput())
    taskInputDiv.appendChild(createTextFormInput('Task-Notes', "Note:"))
    
    return taskInputDiv}







// 
// edit task
// 
function createFormInput(task) { 
    
    
    const taskInputDiv = document.createElement('div')
    taskInputDiv.classList.add("edit-task-input")

    taskInputDiv.appendChild(createTextFormInput('Edit-Task-Name', "Task:", task.title))
    taskInputDiv.appendChild(createTextFormInput('Edit-Task-Description', "Description:", task.description))
    taskInputDiv.appendChild(createDateFormInput('Edit-Task-Deadline', "Deadline:", task.deadline))
    taskInputDiv.appendChild(createPriorityRadioFormInput(task.priority))
    taskInputDiv.appendChild(createTextFormInput('Edit-Task-Notes', "Note:", task.notes))
    
    return taskInputDiv}

function createTextFormInput(formLabel, userPrompt, taskValue) {
    const createLabel = document.createElement('label')
    createLabel.setAttribute("for", formLabel)
    createLabel.textContent = userPrompt
    const createInput = document.createElement('input')
    createInput.setAttribute("type", "text")
    createInput.setAttribute("name", formLabel)
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
    const createLegend = document.createElement('legened')
    createLegend.textContent = "Select Task Priority"
    createFieldset.appendChild(createLegend)

    const createRadioOne = document.createElement('div')
    const createInput1 = document.createElement('input')
    createInput1.setAttribute("type", "radio")
    createInput1.setAttribute("name", "edit-priority")
    createInput1.setAttribute('value', "High Priority")
    createInput1.id = "highPriority"
    if(taskValue === "High Priority"){
        
        createInput1.setAttribute('checked', true)
    }

    const createLabel1 = document.createElement('label')
    createLabel1.setAttribute("for", 'highPriority')
    createLabel1.textContent = 'High Priority'
    createRadioOne.appendChild(createInput1)
    createRadioOne.appendChild(createLabel1)

    const createRadioTwo = document.createElement('div')
    const createInput2 = document.createElement('input')
    createInput2.setAttribute("type", "radio")
    createInput2.setAttribute("name", "edit-priority")
    createInput2.setAttribute('value', "Medium Priority")
    createInput2.id = "mediumPriority"
    if(taskValue === "Medium Priority"){
        
        createInput2.setAttribute('checked', true)
    }

    const createLabel2 = document.createElement('label')
    createLabel2.setAttribute("for", 'mediumPriority')
    createLabel2.textContent = 'Medium Priority'
    createRadioOne.appendChild(createInput2)
    createRadioOne.appendChild(createLabel2)

    const createRadioThree = document.createElement('div')
    const createInput3 = document.createElement('input')
    createInput3.setAttribute("type", "radio")
    createInput3.setAttribute("name", "edit-priority")
    createInput3.setAttribute('value', "Low Priority")
    createInput3.id = "lowPriority"
    if(taskValue === "Low Priority"){
        
        createInput3.setAttribute('checked', true)
    }

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
      
      
      
      
      // submit for information
function createModalSubmitButton(boardName, task) {
    const saveTask = document.createElement('input')
    saveTask.setAttribute('type', 'submit')
    saveTask.setAttribute('form', 'task-form')
    saveTask.setAttribute('name', 'edit-task')
    saveTask.setAttribute('value', 'Save')
    saveTask.id = 'submit-Task'

    // use submit button to create task object below
    saveTask.addEventListener("click", function(event) {
        event.preventDefault();


        const taskNameInput = document.querySelector('#Edit-Task-Name').value
        
        const descriptionInput = document.querySelector("#Edit-Task-Description").value
        const deadlineInput = document.querySelector("#Edit-Task-Deadline").value
        const priority = document.querySelector('input[name="edit-priority"]:checked').value;
        
        const noteInput = document.querySelector("#Edit-Task-Notes").value
        const dialog = document.querySelector("#edit-task")
        const statusActive = dialog.dataset.selectedStatus
        
        
        const newtask = new Task(taskNameInput, descriptionInput, deadlineInput, priority, noteInput, statusActive)
        
        replaceTask(task, newtask, boardName)
        closeModal()
        
        updateBoardPage(boardName)
        
    })
    return saveTask
}