import { compareAsc, compareDesc } from "date-fns";
import { boards } from "./board";
import { taskCardCreater } from "./status";

function createDateObj(task, board) {
    let dateHandler = task.deadline
            if (task.deadline != "") {
                
            for (let p = 0; p < 2; p++) {
          
            dateHandler = dateHandler.replace('-', ', ')
            dateHandler = dateHandler.replace(' 0', ' ')}
            }
            else {
                dateHandler = ""
            }
    return {date: dateHandler, task: task, board: board}
}

function createMasterDateArray() {
    const masterArray = []
    for (let i in boards) {
        for (let x in boards[i]['tasks']) {
            masterArray.push(createDateObj(boards[i]['tasks'][x], boards[i]))
        }
    }
    return masterArray
}

function dateSortAscending() {
    const array = createMasterDateArray()
    const dateInfoList = []
    const emptyDates = []
    for (let x in array) {
        if (array[x]['date'] != "") {
        dateInfoList.push(array[x]['date'])}
        else {
            emptyDates.push(array[x]['date'])}
        }
    
    dateInfoList.sort(compareAsc)
    dateInfoList.push(...emptyDates)
    const sortedList = []
    for (let x in dateInfoList) {
        for (let i in array) {
            if (dateInfoList[x] === array[i]['date'])
                if (sortedList.includes(array[i]) === false) {
                    sortedList.push(array[i])}
        }

    }
    return sortedList
    
}

function dateSortDescending() {
    const array = createMasterDateArray()
    const dateInfoList = []
    const emptyDates = []
    for (let x in array) {
        if (array[x]['date'] != "") {
        dateInfoList.push(array[x]['date'])}
        else {
            emptyDates.push(array[x]['date'])}
        }
    
    dateInfoList.sort(compareDesc)
    dateInfoList.push(...emptyDates)
    const sortedList = []
    for (let x in dateInfoList) {
        for (let i in array) {
            if (dateInfoList[x] === array[i]['date'])
                if (sortedList.includes(array[i]) === false) {
                    sortedList.push(array[i])}
        }
    debugger

    }
    return sortedList
    
}

function ascendingDomHandler() {
    const container = document.querySelector('.master-task-container')
    container.innerHTML = ''
    const taskList = dateSortAscending()
    
    for (let x in taskList) {
        container.appendChild(taskCardCreater(taskList[x]['task'], taskList[x]['board']))
    }
}

function descendingDomHandler() {
    const container = document.querySelector('.master-task-container')
    container.innerHTML = ''
    const taskList = dateSortDescending()

    for (let x in taskList) {
        container.appendChild(taskCardCreater(taskList[x]['task'], taskList[x]['board']))
    }
}

export {ascendingDomHandler, descendingDomHandler}