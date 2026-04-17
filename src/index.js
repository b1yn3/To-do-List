import "./styles/global.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import { renderUIForTask, toggleSidebar } from "./js/ui.js";

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

const toggleSide = document.getElementById("toggle-sidebarButton");
toggleSide.addEventListener("click", toggleSidebar);