import "./styles/global.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import "./styles/completed.css";
import { renderUIForTask, toggleSidebar, renderUIforCompleted } from "./js/ui.js";

let taskArray = []

class ToDoItem {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", renderUIForTask);

const completedTaskBtn = document.getElementById("completedTaskBtn");
completedTaskBtn.addEventListener("click", renderUIforCompleted);

const toggleSide = document.getElementById("toggle-sidebarButton");
toggleSide.addEventListener("click", toggleSidebar);