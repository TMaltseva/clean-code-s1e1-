//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.
const taskInput = document.querySelector(".task__input_new");
const addButton = document.querySelector(".task__button_new");
const incompleteTaskHolder = document.querySelector(".task-list-to-do");
const completedTasksHolder = document.querySelector(".task-list-completed");

//New task list item
const createNewTaskElement = (taskString) => {
  const listItem = document.createElement("li");
  listItem.className = "task";

  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  label.innerText = taskString;
  label.className = "task__label";

  //Each elements needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  editInput.type = "text";
  editInput.className = "task__input task__input_edit";
  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not
  editButton.className = "task__button task__button_edit";

  deleteButton.className = "task__button task__button_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Remove button";
  deleteButtonImg.className = "task__img_delete";
  deleteButton.appendChild(deleteButtonImg);

  //Append elements
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = () => {
  console.log("Add Task...");
  //Create a new list item with the text from the new task:
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

//Edit an existing task
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".task__button_edit");
  const containsClass = listItem.classList.contains("task-editMode");
  //If class of the parent is .task-editMode
  if (containsClass) {
    // Switch to editmode
    // Label becomes the input's value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  // Toggle editmode on the parent
  listItem.classList.toggle("task-editMode");
};

//Delete task
const deleteTask = function() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  const label = listItem.querySelector(".task__label");
  label.className = "completed-task__label";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks
  const listItem = this.parentNode;
  const label = listItem.querySelector(".completed-task__label");
  label.className = "task__label";
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = () => {
  console.log("AJAX Request");
}

//The glue to hold it all together

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events");
  //Select ListItems children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector(".task__button_edit");
  const deleteButton = taskListItem.querySelector(".task__button_delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkBoxEventHandler);
};

//Cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //Bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
};

//Cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //Bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};

//Issues with usability don't get seen until they are in front of a human tester

//Prevent creation of empty tasks

//Change edit to save when you are in edit mode