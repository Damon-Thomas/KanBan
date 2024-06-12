import {boards, removeStatus, deleteTask, deleteAllTasksWithStatus} from "./board.js"
import { updateBoardPage } from './index.js'
import {openTaskModal} from "./createTaskModal.js"
import { openModal } from "./statusModal.js"
import { createEditTaskModal, openEditTaskModal } from "./editTask.js"
import { createDeleteStatusModal, openDeleteStatusModal } from "./deletestatusmodal.js"
import deleteIcon from "./img/trash-2.svg"
import addIcon from "./img/plus-square.svg"
// status column handler
// create status columns and create new button
function statusHandler(boardName) {
    
    const statusCollection = createStatusCollection()
    fillStatusCollection(statusCollection, boardName)
    statusCollection.appendChild(statusCreationButton())
    
    return statusCollection
}

function masterHandler() {
    
    const taskCollection = createMasterTaskCollection()
    
    fillTaskCollection(taskCollection)
    
    return taskCollection
}

function fillTaskCollection(taskCollection){
    console.log('fill')
    for (let i in boards) {
        console.log('in1')
        for (let x in boards[i]['tasks']){
            console.log(boards[i]['tasks'][x])
            console.log(boards[i])
            taskCollection.appendChild(taskCardCreater(boards[i]['tasks'][x], boards[i]))
        }
    }
}


function createMasterTaskCollection() {
    const taskCollection = document.createElement('div')
    taskCollection.classList.add('master-task-container')
    return taskCollection
}

function createTaskCollection() {
    const taskCollection = document.createElement('div')
    taskCollection.classList.add('task-container')
    return taskCollection
}

// create main status div
function createStatusCollection() {
    const statusCollection = document.createElement('div')
    statusCollection.classList.add('status-container')
    return statusCollection
}

// cycle through every status in active board
function fillStatusCollection(statusCollection, boardName){
    for (let i = 0;i < boards.length;i++) {
        if (boardName === boards[i]["name"]) {
            const activeBoard = boards[i]
            for (let x = 0; x < activeBoard['statuses'].length; x++){
                statusCollection.appendChild(createStatus(activeBoard['statuses'][x], activeBoard))
            }
        }
        }
}

function fillMasterTaskCollection() {
    return
}

// create status column with name set as dataset
function createStatusContainer(name) {
    const statusContainer = document.createElement('div')
    statusContainer.classList.add('status-column')
    statusContainer.dataset.statusName = name
    return statusContainer
}

// create title element for status column
function createStatusContainerTitle(name) {
    const statusContainerTitle = document.createElement('h4')
    statusContainerTitle.textContent = name
    return statusContainerTitle
}

// create button to remove status from board object in master list and refresh screen
function createDeleteStatusButton(status, board) {
    const deleteStatus = document.createElement('div')
    const caption = document.createElement('p')
    caption.textContent = "Delete Status"
    caption.classList.add('delete-status-caption')
    deleteStatus.classList.add('delete-status-button')
    deleteStatus.innerHTML = `<img class= 'status-trash' src= ${deleteIcon} />`
    deleteStatus.appendChild(caption)
    deleteStatus.addEventListener("click", function(){   
        createDeleteStatusModal(board['name'])
        openDeleteStatusModal(status)

})
    return deleteStatus}

// remove status from board object
function deleteStatusButtonFunction(status, board) {
    removeStatus(board, status)
    deleteAllTasksWithStatus(board, status)
    updateBoardPage(board['name'])
} 

// Create button to open modal for creating a task
function taskCreationButton(status) {
    const createTaskButton = document.createElement('div')
    createTaskButton.classList.add('create-task-button')
    createTaskButton.innerHTML = `<img class= 'addIcon' src= ${addIcon} />`
    const caption = document.createElement('p')
    caption.textContent = "Create Task"
    caption.classList.add('create-task-caption')
    
    
    createTaskButton.appendChild(caption)
    
    createTaskButton.addEventListener("click", function(){
        openTaskModal(status)
    })
    return createTaskButton
}

// create and fill status container
function createStatus(name, board) {
    const statusContainer = createStatusContainer(name)
    const statusHeader = document.createElement('div')
    statusHeader.classList.add('status-header')
    const statusButtons = document.createElement('div')
    statusButtons.classList.add('status-header-buttons')
    statusHeader.appendChild(createStatusContainerTitle(name))
    statusButtons.appendChild(createDeleteStatusButton(name, board))
    statusButtons.appendChild(taskCreationButton(name))
    statusHeader.appendChild(statusButtons)
    statusContainer.appendChild(statusHeader)
    const taskCollection = document.createElement('div')
    taskCollection.classList.add('task-collection')
    taskCollection.appendChild(taskCardListByStatus(board, name))
    statusContainer.appendChild(taskCollection)
    
    return statusContainer
}

// create button for making new status and adding to board
function statusCreationButton() {
    const createStatusButton = document.createElement('div')
    createStatusButton.classList.add('create-status-button')
    createStatusButton.innerHTML = `<img class= 'addIcon' src= ${addIcon} />`
    const caption = document.createElement('p')
    caption.textContent = "Create Status"
    caption.classList.add('create-status-caption')
    
    
    createStatusButton.appendChild(caption)
    createStatusButton.addEventListener("click", function(){
        openModal()
    })
    return createStatusButton
}

// Task Handling
// create container for task to be put inside
function taskCardContainer() {
    const container = document.createElement('div')
    container.classList.add('task-card-container')
    return container
}

// create and fill container with task cards
function taskCardListByStatus(board, status) {
    const cardContainer = taskCardContainer()
    for (let i = 0; i < board['tasks'].length; i++) {
        const activeTask = board['tasks'][i]
        if (activeTask.status === status) {
            cardContainer.appendChild(taskCardCreater(activeTask, board))
        }
    }
    return cardContainer
}

// create task card handler
function taskCardCreater(task, board) {
    
    const taskDiv = createTaskContainer(task)
    taskDiv.appendChild(createTaskTitle(task))
    taskDiv.appendChild(createTaskDeadline(task))
    taskDiv.appendChild(createDeleteTaskButton(task, board))

    taskDiv.addEventListener("click", function() {
        let container
        const verifyBoard = document.querySelector('.board-title')
        console.log('verify',verifyBoard.value)
        if (document.querySelector('#master-board-title')) {
            container = document.querySelector(".master-board-content")
        }
        else {
            container = document.querySelector(".board-content")
        }
        
        const dialog = createEditTaskModal(board.name, task)
       
        container.appendChild(dialog)
        openEditTaskModal(task.status)
       
        
    })
// 
    return taskDiv
}

// create card for task card
function createTaskContainer(task) {
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task-container')
    taskDiv.classList.add(task.priority.replace(/\s/g, ''))
    return taskDiv
}
// create title for task card
function createTaskTitle(task) {
    const taskTitle = document.createElement('h3')
    taskTitle.classList.add('task-title')
    taskTitle.textContent = task.title
    return taskTitle
}

// create deadline for task card
function createTaskDeadline(task) {
    const taskDeadline = document.createElement('p')
    taskDeadline.classList.add('task-deadline')
    if (task.deadline != "") {
    taskDeadline.textContent = `Due: ${task.deadline}`}
    return taskDeadline
}

// create delete button for task card
function createDeleteTaskButton(task, board) {
    const deleteTaskbutton = document.createElement('div')
    deleteTaskbutton.classList.add('delete-task')
    
    deleteTaskbutton.classList.add('delete-status-button')
    deleteTaskbutton.innerHTML = `<img class= 'task-trash' src= ${deleteIcon} />`
    
    deleteTaskbutton.addEventListener("click", function(event) {
        event.stopPropagation()
        deleteTaskButtonFunction(task, board)
    })
    return deleteTaskbutton
}

// task card delete button functionality
function deleteTaskButtonFunction(task, board) {
    deleteTask(task, board)
    updateBoardPage(board['name'])
}

// 
// 











export {statusHandler, deleteStatusButtonFunction, masterHandler}
