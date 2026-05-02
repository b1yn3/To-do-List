import "./styles/global.css";
import  "./styles/inbox.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import "./styles/today.css";
import "./styles/completed.css";
import { renderUIForTask, toggleSidebar, renderUIforCompleted, renderUIForInbox, todayTasks, upcomingTask,  } from "./js/ui.js";


const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", renderUIForTask);

const completedTaskBtn = document.getElementById("completedTaskBtn");
completedTaskBtn.addEventListener("click", renderUIforCompleted);

const toggleSide = document.getElementById("toggle-sidebarButton");
toggleSide.addEventListener("click", toggleSidebar);

const toggleInbox = document.getElementById("inboxBtn");
toggleInbox.addEventListener("click", renderUIForInbox);

const toggleToday = document.getElementById("todayTaskBtn");
toggleToday.addEventListener("click", todayTasks);

const toggleUpcoming = document.getElementById("upcomingTaskBtn");
toggleUpcoming.addEventListener("click", upcomingTask);
