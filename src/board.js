// master board handling
// '2024-05-15'
// master board list and 2 premade boards
const boards = []
createBoard("My Coding Journey")
createBoard("House Maintanence this year")
addTaskToBoard('My Coding Journey', new Task('TODO project', 'Complete a todo list using all the skills you have learned so far', '2024-06-15', 'High', 'Do a Kanban variation of the project', 'In Progress'))
addTaskToBoard('My Coding Journey', new Task('Library Project', 'Complete a library using all the skills you have learned so far', '2024-06-09', 'High', 'add filter functionality', 'Done'))
addTaskToBoard('My Coding Journey', new Task('Tic Tac Toe', 'Complete a Tic Tac Toe Project using JavaScript', '2024-06-12', 'High', 'Make it simple but look nice', 'Done'))
addTaskToBoard('My Coding Journey', new Task('My Website', 'Make a personal website using all your skills that shows off your completed projects', '2024-12-31', 'High', 'Take your time and make it perfect', 'ToDo'))
addTaskToBoard('My Coding Journey', new Task('Admin Dashboard Thing', 'From The Odin Project', '', 'High', '', 'Done'))
addTaskToBoard('My Coding Journey', new Task('Sign Up form', 'From The Odin Project', '', 'High', '', 'Done'))
addTaskToBoard('House Maintanence this year', new Task('Seal Driveway', 'Cleane and seal driveway', '2024-08-15', 'Medium', 'Use CT gift cards', 'ToDo'))
addTaskToBoard('House Maintanence this year', new Task('Replace A/C', 'Replace Broken Air Conditioner', '2024-06-01', 'High', 'PAID', 'Done'))
addTaskToBoard('House Maintanence this year', new Task('Powerwash', 'Clean outdoor surfaces', '2024-06-30', 'Medium', 'Stain Deck soon after', 'ToDo'))

// create new board object - statuses array has 3 premade inputs
function createBoard(boardname) {
    
    let board = {name: boardname, tasks: [], statuses: ["ToDo", "In Progress", "Done"]}
    boards.push(board)
}

// add task object to board in master list
function addTaskToBoard(boardname, task) {
    
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].name === boardname) {
            boards[i].tasks.push(task)
        }
    } 
}

// add status to statuses array in board object
function addStatusToBoard(boardname, status) {
    for (let i = 0; i < boards.length; i++) {
        if (boards[i].name === boardname) {
            boards[i].statuses.push(status)
            
        }
    }
    
}

// delete the board from master list
function deleteBoard(board){
    let index = boards.indexOf(board)
    boards.splice(index, 1)
    
}

// delete status from specified board
function removeStatus(board, status){
    for (let i = 0; i < (board['statuses'].length); i++){
        if (board['statuses'][i] === status) {
            let index = board['statuses'].indexOf(status)
            board['statuses'].splice(index, 1)
        }
    }
}

// delete task from specified board
function deleteTask(task, board) {
    for (let i=0; i < board['tasks'].length; i++) {
        if (board['tasks'][i] === task){
            board['tasks'].splice(i, 1)
        }
    }}

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
    }}

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




export {Task, boards, createBoard, addTaskToBoard, addStatusToBoard, deleteBoard, removeStatus, deleteTask, replaceTask, deleteAllTasksWithStatus, findBoardFromBoardName}