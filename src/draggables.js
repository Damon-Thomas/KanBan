import { boards, changeStatusOrder, changeTaskOrder, changeTaskStatus } from "./board";

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
        console.log('client X', e.clientX)
        const afterElement = getDragAfterElementX(e.clientX)
        
        console.log('afterelementstatus', afterElement)
        const draggable = document.querySelector('.dragging-status')
        console.log('dragging', draggable)
        const status = draggable.dataset.statusName
        // closest('.status-column').
        const boardName = document.querySelector('.board-title').textContent
        
        
        
        if (afterElement == null) {
            
            statusContainer.insertBefore(draggable, statusButton)
            
            
            // add to end
            changeStatusOrder(status, afterElement, boardName )

            // if (container.firstChild) {
            
            // changeTaskOrder(taskName, container.lastChild, boardName )}
            
        }
        else {
            
            const afterStatus = afterElement.dataset.statusName
            statusContainer.insertBefore(draggable, afterElement)
            // let afterTaskName = afterElement.firstChild.textContent
            changeStatusOrder(status, afterStatus, boardName )
            
            // before after element
            // changeTaskStatus(taskName, status, boardName )
            // changeTaskOrder(taskName, afterTaskName, boardName )

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
                console.log('drag', draggable)
                const taskName = draggable.firstChild.textContent
                
                
                if (afterElement == null) {
                    
                    container.insertBefore(draggable, afterElement)
                    
                    
                    // add to end
                    changeTaskStatus(taskName, status, boardName )

                    if (container.firstChild) {
                    
                    changeTaskOrder(taskName, container.lastChild, boardName )}
                    
                }
                else {
                    

                    container.insertBefore(draggable, afterElement)
                    let afterTaskName = afterElement.firstChild.textContent

                    
                    // before after element
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
        console.log('draggable elements', draggableElements)
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            console.log('right', box.left)
            console.log('width', box.width)
            const offset = x - box.left - box.width / 2
            console.log('offset', offset)
            if (offset < 0 && offset > closest.offset){
                return {offset: offset, element: child}
            }
            else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }}

export {dragIt}