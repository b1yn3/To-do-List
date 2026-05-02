import { createElement, createSelect, getDateToday } from "./utils.js";
import { saveData } from "./task.js";

// Come back and make this more reusable with reusable functions --> March 2, 2026 <--

function renderPage({headerContent, condition, createUI}){
    const main = document.querySelector("main");
    const existingType = main.querySelector(".containerBase");

    if(existingType){
        existingType.remove();
    } else {
        main.innerHTML = "";
    }

    const todayContainer = createElement("div", {
        className: "containerBase",
    });
    
    const todayHeader = createElement("div", {
        className: "todayHeader",
    });
   const headerh2 = document.createElement("h2");
   headerh2.textContent = headerContent;

   todayHeader.appendChild(headerh2);
   todayContainer.appendChild(todayHeader);

   addTask({
        container: todayContainer,
        taskCondition: condition,
        createUI: createUI
    });
    main.appendChild(todayContainer)
}

function addTask({container, taskCondition, createUI}){
    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = getDateToday();
    taskArray.forEach(task => {
        if(taskCondition(task)){
            const newTask = createUI(task);
            container.appendChild(newTask);
            
        }
    });
}

function upcomingTask(){
    const today = getDateToday();
    renderPage({
        headerContent: "Upcoming Tasks:",
        condition: (task) => !task.isCompleted && task.date > today,
        createUI: createUIforUpcomingTask
    });
}

function todayTasks(){
    const today = getDateToday();
    renderPage({
        headerContent: "Overdue and Today's Tasks:",
        condition: (task) => !task.isCompleted && task.date <= today,
        createUI: createUIforCompletingTask
    });
}

// Add Task

function createUIforTask(){
    const divTaskContainer = createElement("div", {
        className: "taskContainer",
    });

    const taskForm = document.createElement("form");

    const titleTxt = createElement("input", {
        type: "text",
        name: "titletxt",
        id: "titletxt",
        placeholder: "Title",
        required: true
    });

    const descriptionTxt = createElement("textarea", {
        rows: 4,
        name: "descriptiontxt",
        id: "descriptiontxt",
        placeholder: "Description",
        required: true
    });

    const divTimeContainer = createElement("div", {
        className: "timeContainer",
    });

    const divleftSide = createElement("div", {
        className: "leftSide",
    });

    const dateSelector = createElement("input", {
        type: "date",
        id: "dateSelector",
        className: "cursorPointer",
        min: getDateToday(),
        value: getDateToday(),
        required: true
    });

    const prioritySelect = createSelect(
        [
            {value: "1", label: "Priority 1"},
            {value: "2", label: "Priority 2"},
            {value: "3", label: "Priority 3"},
            {value: "4", label: "Priority 4"},
        ],
        {
            id: "priorityNumber",
            className: "cursorPointer"
        }
    )
    
    const divRightSide = createElement("div", {
        className: "rightSide",
    });

    const divaddTask = createElement("button", {
        type: "submit",
        textContent: "Add Task",
        id: "addTask",
        className: "cursorPointer"
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!taskForm.checkValidity()) {
            taskForm.reportValidity();
            return;
        }
        saveData(titleTxt.value, descriptionTxt.value, dateSelector.value, prioritySelect.value);

        taskForm.reset();
        dateSelector.value = getDateToday();
    });

    divRightSide.appendChild(divaddTask)
    divleftSide.append(dateSelector, prioritySelect);
    divTimeContainer.append(divleftSide, divRightSide);
    taskForm.append(titleTxt, descriptionTxt, divTimeContainer);
    divTaskContainer.appendChild(taskForm);
    

    return divTaskContainer;
}

function renderUIForTask(){
    const main = document.querySelector("main");
    const existingTaskUI = main.querySelector(".taskContainer");

    if (existingTaskUI) {
        return;
    } else {
        main.innerHTML = "";
    }

    const taskUI = createUIforTask();
    main.appendChild(taskUI)
}

function toggleSidebar(){
    const aside = document.querySelector("aside");
    aside.classList.toggle("collapsed");
}

// Inbox 

function createUIforInbox(){
    const inboxContainer = createElement("div", {
        className: "inboxContainer",
    });
    const announcementContainer = createElement("div", {
        className: "announcementContainer",
    });
    const announcementBox = createElement("div", {
        className: "announcementBox",
    });

    const announceH = document.createElement("h1");
    announceH.textContent = "ANNOUNCEMENT";

    const announceBoxH = document.createElement("h3");
    announceBoxH.textContent = "What's New?";

    const pA = document.createElement("p");
    pA.textContent = "Try out the new My Projects addition for To Do App!";
    const pB = document.createElement("p");
    pB.textContent = "Projects: A way to group related tasks!";
    const pC = document.createElement("p");
    pC.textContent = "My Project: Add your tasks to a project of your own choosing!";
    const pD = document.createElement("p");
    pD.textContent = "Bug fixes: fixed the bug where non-completed items appear in Completed Tasks";

    announcementContainer.appendChild(announceH);
    announcementBox.append(announceBoxH, pA, pB, pC, pD);
    inboxContainer.append(announcementContainer, announcementBox);

    return inboxContainer;
}

function renderUIForInbox(){
    const main = document.querySelector("main");
    const existingTaskUI = main.querySelector(".inboxContainer");

    if (existingTaskUI) {
        return;
    } else {
        main.innerHTML = "";
    }

    const taskUI = createUIforInbox();
    main.appendChild(taskUI)
}

// Today and Upcoming

function createUIforCompletingTask(task){
   // todayTask
   const todayTask = createElement("div", {
        className: "todayTask",
    });

    // todayTaskHeader and children

    const todayTaskHeader = createElement("div", {
        className: "todayTaskHeader",
    });
    const todayTaskTitle = createElement("div", {
        className: "todayTaskTitle",
    });

    const todayTaskDate = createElement("div", {
        className: "todayTaskDate",
    });

    // today description

    const todayTaskDescriptionContainer = createElement("div", {
        className: "todayTaskDescriptionContainer",
    });

    const descriptionP = document.createElement("p");
    todayTaskTitle.textContent = task.title;
    todayTaskDate.textContent = task.date;
    descriptionP.textContent = task.description;

    // Button
    const todayComplete = createElement("div", {
        className: "todayComplete",
    });

    const todayBtn = createElement("button", {
        className: "todayBtn",
    });
    todayBtn.textContent = 'Complete Task';
    todayBtn.addEventListener("click", () => {
        let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

        const updatedTasks = taskArray.map(t => {
            if (t.id === task.id) {
                return { ...t, isCompleted: true };
            }
            return t;
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        todayTasks();
    });
      
    todayComplete.appendChild(todayBtn);
    todayTaskDescriptionContainer.appendChild(descriptionP);
    todayTaskHeader.append(todayTaskTitle, todayTaskDate);
    todayTask.append(todayTaskHeader, todayTaskDescriptionContainer, todayComplete);


    return todayTask;
}

function createUIforUpcomingTask(task){
   // todayTask
   const todayTask = createElement("div", {
        className: "todayTask",
    });

    // todayTaskHeader and children

    const todayTaskHeader = createElement("div", {
        className: "todayTaskHeader",
    });
    const todayTaskTitle = createElement("div", {
        className: "todayTaskTitle",
    });

    const todayTaskDate = createElement("div", {
        className: "todayTaskDate",
    });

    // today description

    const todayTaskDescriptionContainer = createElement("div", {
        className: "todayTaskDescriptionContainer",
    });

    const descriptionP = document.createElement("p");
    todayTaskTitle.textContent = task.title;
    todayTaskDate.textContent = task.date;
    descriptionP.textContent = task.description;

    // Button
    const todayComplete = createElement("div", {
        className: "todayComplete",
    });

    const todayBtn = createElement("button", {
        className: "todayBtn",
    });
    todayBtn.textContent = 'Complete Task';
    todayBtn.addEventListener("click", () => {
        let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

        const updatedTasks = taskArray.map(t => {
            if (t.id === task.id) {
                return { ...t, isCompleted: true };
            }
            return t;
        });

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        upcomingTask();
    });
      
    todayComplete.appendChild(todayBtn);
    todayTaskDescriptionContainer.appendChild(descriptionP);
    todayTaskHeader.append(todayTaskTitle, todayTaskDate);
    todayTask.append(todayTaskHeader, todayTaskDescriptionContainer, todayComplete);


    return todayTask;
}

// Completed Tasks --> Make this and the upcoming and todya task be just one function so that its rreausble.

function createUIforCompleted(task){
    const completedTask = createElement("div", {
        className: "completedTask",
    });
    
    // completedTask children
    const completedDescription = createElement("div", {
        className: "completedDescription",
    });
    const completedTaskHead = createElement("div", {
        className: "completedTaskHead",
    });


    // completedTaskHead children
    const titleh3 = document.createElement("h3");
    const completedTitle = createElement("div", {
        className: "completedTitle",
    });
    titleh3.classList.add('completedTitle');

    const completedDate = createElement("div", {
        className: "completedDate",
    });
    const dateh5 = document.createElement("h5");
    dateh5.classList.add('completedDate');
    titleh3.textContent = task.title
    dateh5.textContent = task.date
    completedDescription.textContent = task.description

    completedTask.append(completedTaskHead, completedDescription);
    completedTaskHead.append(titleh3, dateh5);

    return completedTask;
}

function renderUIforCompleted(){
    const main = document.querySelector("main");
    const existingCompleted = main.querySelector(".completed-container");

    if(existingCompleted){
        return;
    } else {
        main.innerHTML = "";
    }

    let taskArray = JSON.parse(localStorage.getItem("tasks")) || [];

    const completedContainer = createElement("div", {
        className: "completed-container",
    });
    const completedName = document.createElement("h2");
    completedName.textContent = "Completed Tasks";
    completedContainer.appendChild(completedName);

    taskArray.forEach(task => {
        if(task.isCompleted){
            const taskUI = createUIforCompleted(task);
            completedContainer.appendChild(taskUI);
        }
    });

    main.appendChild(completedContainer);
}


export { renderUIForTask, toggleSidebar, renderUIforCompleted, renderUIForInbox, upcomingTask, todayTasks };