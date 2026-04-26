export function saveData(taskTitle, taskDescription, taskDate, taskPriority){
    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

    taskArray.push({title: taskTitle, 
        description: taskDescription, 
        date: taskDate, 
        priority: taskPriority
    });

    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

