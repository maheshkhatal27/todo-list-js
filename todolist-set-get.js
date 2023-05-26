//creating unique checkbox id and labeld(for strike through)-using both if else and toggle

let todoItemsConainer = document.getElementById("todoItemsContainer");
let buttonEl = document.getElementById("addbutton");
//for saving in set/get
let saveTodoBtn = document.getElementById("saveTodoButton");
//now delte todolist array as we are retrieving the data form storage
function getTodoListFromStorage() {
    let retirevedList = localStorage.getItem("todoList");
    let convertedJSObj = JSON.parse(retirevedList);
    if (convertedJSObj === null) {
        //we are returning empty list since nothing found
        return [];
    } else {
        return convertedJSObj;
    }
}
let todoList = getTodoListFromStorage();

/*let todoList = [{
        text: "Learn HTML",
        uniqueNo: 1
    },
    {
        text: "Learn CSS",
        uniqueNo: 2
    },
    {
        text: "Learn JAVA SCRIPT",
        uniqueNo: 3
    },
    {
        text: "Learn Bootstrap",
        uniqueNo: 4
    }
];*/

//dynamic listerns adding
saveTodoBtn.onclick = function() {
    //saving todolist obj
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function changeStatusOnTodo(checkboxId, labelID) {
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelID);
    console.log(checkboxEl.checked);
    /*if (checkboxEl.checked=== true){
        labelEl.classList.add("checked");
    }
    else{
        labelEl.classList.remove("checked");
    }*/
    labelEl.classList.toggle("checked");
}

//to delete
function onDeleteStatus(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsConainer.removeChild(todoElement);
    //we are removing child from todo container
    console.log(todoList);

}
//to get an unique number to the item being added to the list
let todoCount = todoList.length

function createToDoList(todo) {

    //creating labelID and checkboxid

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    //for deleting creating a todoId
    let todoId = "todo" + todo.uniqueNo;

    let liElement = document.createElement("li");
    liElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsConainer.appendChild(liElement);


    //assigning the todo element to be deleted-----imp step
    liElement.id = todoId;

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    //inputEl.id = "myCheckbox";
    inputEl.id = checkboxId;
    inputEl.classList.add("checkbox-input");
    liElement.appendChild(inputEl);
    //creatind dynamic listner when clicked on checkbox
    inputEl.onclick = function() {
        changeStatusOnTodo(checkboxId, labelId);
    };

    //creating label conainer
    //adding from todo array the text--for html,css..etc
    let labelDiv = document.createElement("div");
    labelDiv.classList.add("d-flex", "flex-row", "label-container");
    liElement.appendChild(labelDiv);
    //label element
    let labelEl = document.createElement("label");
    //labelEl.setAttribute("for", "myCheckbox");
    labelEl.setAttribute("for", checkboxId);
    //for strikethrough will match chkbox id and label id
    labelEl.id = labelId;
    labelEl.classList.add("checkbox-label");
    labelEl.textContent = todo.text;
    labelDiv.appendChild(labelEl);


    //creating div delete and appending to label div
    let divDelete = document.createElement("div");
    divDelete.classList.add("delete-icon-container");
    labelDiv.appendChild(divDelete);

    let delEl = document.createElement("i");
    delEl.classList.add("far", "fa-trash-alt", "delete-icon");

    delEl.onclick = function() {
        onDeleteStatus(todoId);
    };

    divDelete.appendChild(delEl);
}
//createToDoList(todoList[0]);
//createToDoList(todoList[1]);
//createToDoList(todoList[2]);

for (let each_todo of todoList) {
    createToDoList(each_todo);
}

//to add from user
function onAddTodo() {
    let userInput = document.getElementById("todoUserInput");
    let userEnterElement = userInput.value;
    //to alert
    if (userEnterElement === "") {
        alert("Enter valid text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userEnterElement,
        uniqueNo: todoCount
    };
    //for storing in local storate
    todoList.push(newTodo);

    //sending to create todo list main function
    createToDoList(newTodo);
    //to clear off enter box
    userInput.value = "";
}
buttonEl.onclick = function() {
    onAddTodo();
}