// master board handling
// 
// master board list and 2 premade boards
const boards = []
createBoard("My Coding Journey")
createBoard("House Maintanence this year")

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


// task constructor
function Task(title, description, deadline, priority, notes, status) {

    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.notes = notes
    this.status = status
    }



export {Task, boards, createBoard, addTaskToBoard, addStatusToBoard, deleteBoard, removeStatus, deleteTask, replaceTask}