// master board handling


import { format, compareAsc } from "date-fns";


function createDate(date) {
    return format(new Date(date), "PP")
}



// localStorage.clear()
let boards = []
if(!localStorage.getItem('boards')) {
    console.log('in1')
    initialise()
    
    }
else {
    
    console.log('in')
    console.log(localStorage.getItem('boards'))

    boards = JSON.parse(localStorage.getItem('boards'))
   
    }





function initialise() {
    createBoard("My Coding Journey")
    createBoard("House Maintanence this year")
    addTaskToBoard('My Coding Journey', new Task('TODO project', 'Complete a todo list using all the skills you have learned so far', createDate('2024, 6, 15'), 'High', 'Do a Kanban variation of the project', 'In Progress'))
    addTaskToBoard('My Coding Journey', new Task('Library Project', 'Complete a library using all the skills you have learned so far', createDate('2024, 6, 9'), 'High', 'add filter functionality', 'Done'))
    addTaskToBoard('My Coding Journey', new Task('Tic Tac Toe', 'Complete a Tic Tac Toe Project using JavaScript', createDate('2024, 6, 12'), 'High', 'Make it simple but look nice', 'Done'))
    addTaskToBoard('My Coding Journey', new Task('My Website', 'Make a personal website using all your skills that shows off your completed projects', createDate('2024, 12, 31'), 'High', 'Take your time and make it perfect', 'ToDo'))
    addTaskToBoard('My Coding Journey', new Task('Admin Dashboard Thing', 'From The Odin Project', '', 'High', '', 'Done'))
    addTaskToBoard('My Coding Journey', new Task('Sign Up form', 'From The Odin Project', '', 'High', '', 'Done'))
    addTaskToBoard('House Maintanence this year', new Task('Seal Driveway', 'Cleane and seal driveway', createDate('2024, 8, 15'), 'Medium', 'Use CT gift cards', 'ToDo'))
    addTaskToBoard('House Maintanence this year', new Task('Replace A/C', 'Replace Broken Air Conditioner', createDate('2024, 6, 1'), 'High', 'PAID', 'Done'))
    addTaskToBoard('House Maintanence this year', new Task('Powerwash', 'Clean outdoor surfaces', createDate('2024, 6, 30'), 'Medium', 'Stain Deck soon after', 'ToDo'))
}




function getBoards() {
    const boards = localStorage.getItem('boards')
}

function storeBoards() {
    const string = JSON.stringify(boards)
    localStorage.setItem('boards', string)
}

// create new board object - statuses array has 3 premade inputs
function createBoard(boardname) {
    
    let board = {name: boardname, tasks: [], statuses: ["ToDo", "In Progress", "Done"]}
    boards.push(board)
    storeBoards()
}

// add task object to board in master list
function addTaskToBoard(boardname, task) {
    
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].name === boardname) {
            boards[i].tasks.push(task)
        }
    } 
    storeBoards()

}

// add status to statuses array in board object
function addStatusToBoard(boardname, status) {
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].name === boardname) {
            boards[i].statuses.push(status)
            
        }
    }
    storeBoards()
    
}

// delete the board from master list
function deleteBoard(board){
    let index = boards.indexOf(board)
    boards.splice(index, 1)
    storeBoards()
    
}

function dateList() {
    const dateList = []
    for (let i in boards) {
        for (let x in boards['tasks']) {
            let dateHandler = x.deadline
            if (x.deadline != "") {
                continue}
            for (let p = 0; p < 2; p++) {
          
            dateHandler = dateHandler.replace('-', ', ')
            dateHandler = dateHandler.replace(' 0', ' ')
        }
        }
    }
}

// delete status from specified board
function removeStatus(board, status){
    for (let i = 0; i < (board['statuses'].length); i++){
        if (board['statuses'][i] === status) {
            let index = board['statuses'].indexOf(status)
            board['statuses'].splice(index, 1)
        }
    }
    storeBoards()
}

// delete task from specified board
function deleteTask(task, board) {
    for (let i=0; i < board['tasks'].length; i++) {
        if (board['tasks'][i] === task){
            board['tasks'].splice(i, 1)
        }
    }
    storeBoards()}

function findBoardFromBoardName(boardname){
    for(let i = 0; i < boards.length; i++) {
        if (boards[i]['name'] === boardname ){
            return boards[i]
        }
    }
}

function replaceTask(task, newTask, boardName) {
    const board = findBoardFromBoardName(boardName)
    for (let i=0; i < board['tasks'].length; i++) {
        if (board['tasks'][i] === task){
            board['tasks'][i] = newTask
        }
    }
    storeBoards()}

function deleteAllTasksWithStatus(board, status) {
    const fullTaskList = board['tasks'].length
    let counter = 0
    for (let i = 0; i < fullTaskList; i++) {
        if(board['tasks'][counter].status === status){
            board['tasks'].splice(counter, 1)
            continue
        }
        counter++
    }
    storeBoards()
}



// task constructor
function Task(title, description, deadline, priority, notes, status) {

    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.notes = notes
    this.status = status
    }




export {Task, boards, createBoard, addTaskToBoard, addStatusToBoard, deleteBoard, removeStatus, deleteTask, replaceTask, deleteAllTasksWithStatus, findBoardFromBoardName, createDate}