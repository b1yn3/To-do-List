import { createElement, createSelect, getDateToday } from "./utils.js";

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


// Completed Tasks

function createUIforCompleted(){
    const completedContainer = createElement("div", {
        className: "completed-container",
    });

    const completedName = document.createElement("h2");
    completedName.innerHTML = "Completed Tasks"
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
    const completedTitle = createElement("div", {
        className: "completedTitle",
    });
    const completedDate = createElement("div", {
        className: "completedDate",
    });


    completedContainer.append(completedName, completedTask);
    completedTask.append(completedTaskHead, completedDescription);
    completedTaskHead.append(completedTitle, completedDate);

    return completedContainer;
}

function renderUIforCompleted(){
    const main = document.querySelector("main");
    const existingCompleted = main.querySelector("completed-container");

    if(existingCompleted){
        return;
    } else {
        main.innerHTML = "";
    }

    const compUI = createUIforCompleted();
    main.appendChild(compUI)


}

export { renderUIForTask, toggleSidebar, renderUIforCompleted };