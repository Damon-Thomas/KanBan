import {createStatusModal, openModal} from './statusModal.js'
import {boards} from "./board.js"
import { updateBoardPage } from './index.js'
import { openTaskModal } from './masterTaskModal.js'

function statusHandler(boardName) {
    
    let activeBoard = ''
    const statusCollection = document.createElement('div')
    statusCollection.classList.add('status-container')
    
    for (let i = 0;i < boards.length;i++) {
        
        if (boardName === boards[i]["name"]) {
            
            activeBoard = boards[i]
            
            for (let i = 0; i < activeBoard['statuses'].length; i++){
                statusCollection.appendChild(createStatus(activeBoard['statuses'][i], activeBoard))
            }
        }
        }
    statusCollection.appendChild(statusCreationButton())
    // statusCollection.appendChild(taskCreationButton())
    
    
    return statusCollection
}




function createStatus(name, board) {
    const statusContainer = document.createElement('div')
    statusContainer.classList.add('status-column')
    statusContainer.dataset.statusName = name
    const statusContainerTitle = document.createElement('h4')
    statusContainerTitle.textContent = name
    statusContainer.appendChild(statusContainerTitle)
    const deleteStatus = document.createElement('button')
    deleteStatus.classList.add('delete-status-button')
    deleteStatus.textContent = 'Remove Status'
    deleteStatus.addEventListener("click", function(){
        
        for (let i = 0; i < board['statuses'].length; i++){
            if (board['statuses'][i] === name) {
                let index = board['statuses'].indexOf(name)
                board['statuses'].splice(index, 1)
            }
        }
        updateBoardPage(board['name'])
    } )

    const cardList = taskCardListByStatus(board, name)
    console.log(cardList)
    for (let i = 0; i < cardList.length; i++) {
        statusContainer.appendChild(cardList[i])
    }
    statusContainer.appendChild(deleteStatus)
    statusContainer.appendChild(taskCreationButton(name))
    return statusContainer
}

function statusCreationButton() {
    const createStatusButton = document.createElement('button')
    createStatusButton.classList.add('create-status-button')
    createStatusButton.textContent = 'Add New Status'
    createStatusButton.addEventListener("click", function(){
        
        openModal()
    })
    return createStatusButton
}

function taskCardListByStatus(board, status) {
    const cardList = []
    for (let i = 0; i < board['tasks'].length; i++) {
        const activeTask = board['tasks'][i]
        console.log(activeTask)
        if (activeTask.status === status) {
            cardList.push(taskCardCreater(activeTask, board))
        }
    }

    return cardList
}

function taskCardCreater(task, board) {
    console.log(task.title)
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task-container')
    taskDiv.classList.add(task.priority.replace(/\s/g, ''))
    const taskTitle = document.createElement('h3')
    taskTitle.classList.add('task-title')
    taskTitle.textContent = task.title
    const taskDeadline = document.createElement('p')
    taskDeadline.classList.add('task-deadline')
    taskDeadline.textContent = task.deadline
    const deleteTaskbutton = document.createElement('button')
    deleteTaskbutton.classList.add('delete-task')
    deleteTaskbutton.textContent = 'Remove Task'
    deleteTaskbutton.addEventListener("click", function() {
        deleteTask(task, board)
    })
    taskDiv.appendChild(taskTitle)
    taskDiv.appendChild(taskDeadline)
    taskDiv.appendChild(deleteTaskbutton)

    taskDiv.addEventListener("click", function() {
        createTaskModal(board['name'], task)
    })

    return taskDiv
}

function editTaskModal(task) {

}



function deleteTask(task, board) {
    for (let i=0; i < board['tasks'].length; i++) {
        if (board['tasks'][i] === task){
            board['tasks'].splice(i, 1)
        }
    }
    updateBoardPage(board['name'])
}



function taskCreationButton(status) {
    const createTaskButton = document.createElement('button')
    createTaskButton.classList.add('create-task-button')
    createTaskButton.textContent = 'Add New Task'
    createTaskButton.addEventListener("click", function(){
        openTaskModal(status)
    })
    return createTaskButton
}



export {statusHandler}
