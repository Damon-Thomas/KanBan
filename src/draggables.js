import { changeBoardOrder, changeStatusOrder, changeTaskOrder, changeTaskStatus } from "./board";

function homeDragIt() {
    const draggableBoard = document.querySelectorAll('.draggable-board')
    const boardContainer = document.querySelector('.boardList')

    draggableBoard.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            
            draggable.classList.add('dragging-board')
        })


        draggable.addEventListener('dragend', () => {
            
            draggable.classList.remove('dragging-board')
        })

    });

    boardContainer.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(e.clientY)
        const draggable = document.querySelector('.dragging-board')
        const board = draggable.getElementsByTagName('h1')[0].textContent
        
        if (afterElement == null) {
            
            boardContainer.appendChild(draggable)
            const afterElement = getDragAfterElement(e.clientY)
            changeBoardOrder(board, afterElement)
            
        }
        else {
            
            const afterBoard = afterElement.getElementsByTagName('h1')[0].textContent
            boardContainer.insertBefore(draggable, afterElement)
            changeBoardOrder(board, afterBoard)
        } 
    } )

    function getDragAfterElement(y) {
        const draggableElements = [...boardContainer.querySelectorAll('.draggable-board:not(.dragging-board)')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }
            else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }
}



function dragIt() {
    const draggableTasks = document.querySelectorAll('.draggable')
    const taskContainer = document.querySelectorAll('.task-card-container')
    const draggableStatus = document.querySelectorAll('.draggable-status')
    const statusContainer = document.querySelector('.status-container')
    const statusButton = document.querySelector('.create-status-button')

    draggableStatus.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.stopPropagation()
            draggable.classList.add('dragging-status')
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging-status')
        })
    });

    draggableTasks.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.stopPropagation()
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    });
    
    statusContainer.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElementX(e.clientX)
        const draggable = document.querySelector('.dragging-status')
        const status = draggable.dataset.statusName
        const boardName = document.querySelector('.board-title').textContent
        
        if (afterElement == null) {
            
            statusContainer.insertBefore(draggable, statusButton)
            changeStatusOrder(status, afterElement, boardName )

        }
        else {
            
            const afterStatus = afterElement.dataset.statusName
            statusContainer.insertBefore(draggable, afterElement)
            changeStatusOrder(status, afterStatus, boardName )
        }
    } )
    
    taskContainer.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const draggable = document.querySelector('.dragging')
            if (draggable != null) {
                const status = container.closest('.status-column').dataset.statusName
                const boardName = document.querySelector('.board-title').textContent
                const taskName = draggable.firstChild.textContent
                
                if (afterElement == null) {
                    
                    container.insertBefore(draggable, afterElement)
                    changeTaskStatus(taskName, status, boardName )
                    if (container.firstChild) {
                    changeTaskOrder(taskName, container.lastChild, boardName )}
                }
                else {
                    container.insertBefore(draggable, afterElement)
                    let afterTaskName = afterElement.firstChild.textContent
                    changeTaskStatus(taskName, status, boardName )
                    changeTaskOrder(taskName, afterTaskName, boardName )

                }}  
        } )
    })

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
    
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }
            else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }

    function getDragAfterElementX(x) {
        const draggableElements = [...statusContainer.querySelectorAll('.draggable-status:not(.dragging-status)')]
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = x - box.left - box.width / 2
            
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }
            else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }}

export {dragIt, homeDragIt}