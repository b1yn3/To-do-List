import "./styles/global.css";
import "./styles/sidebar.css";
import "./styles/main.css";


let taskArray = []

console.log("Hello");

class ToDoItem {
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function createNewTodo(){
    
}


function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    Object.assign(element, options);

    return element;
}

function createSelect(optionsList, selectOptions = {}){
    const select = createElement("select", selectOptions);

    optionsList.forEach(opt => {
        const option = createElement("option", {
            value: opt.value,
            textContent: opt.label
        })
        select.appendChild(option);
    });

    return select;

}

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

    divRightSide.appendChild(divaddTask)
    divleftSide.append(dateSelector, prioritySelect);
    divTimeContainer.append(divleftSide, divRightSide);
    taskForm.append(titleTxt, descriptionTxt, divTimeContainer);
    divTaskContainer.appendChild(taskForm);
    

    return divTaskContainer;
}

function rendUIForTask(){
    // check if it its iS working
    console.log("Yo")
    const main = document.querySelector("main");
    const existingTaskUI = main.querySelector(".taskContainer");

    if (existingTaskUI) {
        return;
    }

    const taskUI = createUIforTask();
    main.appendChild(taskUI)
}


// TEMPORARY JUST TO CHECK 
// ================================================================== //

const addTaskBtn = document.getElementById("addTaskBtn");
addTaskBtn.addEventListener("click", rendUIForTask);