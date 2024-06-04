// ToDo -  Click Task to Edit
// Look into drag and drop for fun.
// - When status is deleted add function to select which status to move all tasks to. Have a default selected, but offer to delete all tasks as well
// Drag and drop function to status list?
// 




function Task(title, description, deadline, priority, notes, status) {
  console.log(title)
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.notes = notes
    
    this.status = status
  }

export {Task}