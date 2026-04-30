import { createElement, createSelect, getDateToday } from "./utils.js";
import { saveData } from "./task.js";

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


// Completed Tasks

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

    // TEMPORARY
    titleh3.innerHTML = task.title
    dateh5.innerHTML = task.date
    completedDescription.innerHTML = task.description

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
    completedName.innerHTML = "Completed Tasks";
    completedContainer.appendChild(completedName);

    taskArray.forEach(task => {
        if(task.isCompleted){
            const taskUI = createUIforCompleted(task);
            completedContainer.appendChild(taskUI);
        }
    });

    main.appendChild(completedContainer);
}

// Make the UI creation resuable and make it just one function
// Do the other buttons and connect it to localStorage

export { renderUIForTask, toggleSidebar, renderUIforCompleted, renderUIForInbox };