export function saveData(taskTitle, taskDescription, taskDate, taskPriority){
    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

    taskArray.push({
        id: Date.now(),
        title: taskTitle, 
        description: taskDescription, 
        date: taskDate, 
        priority: taskPriority,
        isCompleted: false
    });

    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

