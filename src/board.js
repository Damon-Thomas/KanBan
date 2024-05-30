const boards = []

function createBoard(boardname) {
    let board = {name: boardname, tasks: []}
    boards.push(board)
}

function addTaskToBoard(boardname, task) {
    for (let i = 0; i < boards.length - 1; i++) {
        if (boards[i].name === boardname) {
            boards[i].tasks.push(task)
        }
    }
}

function createNewBoard(boardtitle) {
    const dialog = document.getElementById('create-board')
    const form = document.getElementById("form")
    createBoard(boardtitle)
    dialog.close();
    form.reset()
    
    boardList()
}

function boardList() {
    const theList = []
    for (let i = 0; i <= boards.length-1; i++) {
        const activeBoard = boards[i]
        
        const boardButton = document.createElement('button')
        const boardName = document.createElement("h1")
        boardName.textContent = activeBoard['name']
        const numBoardTasks = activeBoard['tasks'].length
        const taskNumber = document.createElement('p')
        taskNumber.textContent = `Tasks: ${numBoardTasks}`
        boardButton.appendChild(boardName)
        boardButton.appendChild(taskNumber)
        theList.push(boardButton)
    }
    
    return theList
}

export {boards, createBoard, addTaskToBoard, createNewBoard, boardList}