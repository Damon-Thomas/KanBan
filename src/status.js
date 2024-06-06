import {boards, removeStatus, deleteTask} from "./board.js"
import { updateBoardPage } from './index.js'
import {openTaskModal} from "./createTaskModal.js"
import { openModal } from "./statusModal.js"
import { createEditTaskModal, openEditTaskModal } from "./editTask.js"

// status column handler
// create status columns and create new button
function statusHandler(boardName) {
    const statusCollection = createStatusCollection()
    fillStatusCollection(statusCollection, boardName)
    statusCollection.appendChild(statusCreationButton())
    
    return statusCollection
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
function createDeleteStatusButton(name, board) {
    const deleteStatus = document.createElement('button')
    deleteStatus.classList.add('delete-status-button')
    deleteStatus.textContent = 'Remove Status'
    deleteStatus.addEventListener("click", function(){   
        deleteStatusButtonFunction(name, board)
})
    return deleteStatus}

// remove status from board object
function deleteStatusButtonFunction(status, board) {
    removeStatus(board, status)
    updateBoardPage(board['name'])
} 

// Create button to open modal for creating a task
function taskCreationButton(status) {
    const createTaskButton = document.createElement('button')
    createTaskButton.classList.add('create-task-button')
    createTaskButton.textContent = 'Add New Task'
    createTaskButton.addEventListener("click", function(){
        openTaskModal(status)
    })
    return createTaskButton
}

// create and fill status container
function createStatus(name, board) {
    const statusContainer = createStatusContainer(name)

    statusContainer.appendChild(createStatusContainerTitle(name))
    statusContainer.appendChild(taskCreationButton(name))
    statusContainer.appendChild(taskCardListByStatus(board, name))
    statusContainer.appendChild(createDeleteStatusButton(name, board))
    
    return statusContainer
}

// create button for making new status and adding to board
function statusCreationButton() {
    const createStatusButton = document.createElement('button')
    createStatusButton.classList.add('create-status-button')
    createStatusButton.textContent = 'Add New Status'
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

    taskDiv.addEventListener("click", function(event) {
        const container = document.querySelector(".board-content")
        const dialog = createEditTaskModal(board.name, task)
        container.appendChild(dialog)
        openEditTaskModal(task.status)
        console.log(boards)
        
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
    taskDeadline.textContent = `Deadline: ${task.deadline}`}
    return taskDeadline
}

// create delete button for task card
function createDeleteTaskButton(task, board) {
    const deleteTaskbutton = document.createElement('button')
    deleteTaskbutton.classList.add('delete-task')
    deleteTaskbutton.textContent = 'Remove Task'
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











export {statusHandler}
