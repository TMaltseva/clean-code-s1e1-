// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.

// Select important DOM elements
const taskInput = document.querySelector(".task__input_new");
const addButton = document.querySelector(".task__button_new");
const incompleteTaskHolder = document.querySelector(".task-list-to-do");
const completedTasksHolder = document.querySelector(".task-list-completed");

// New task list item
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

  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  editInput.type = "text";
  editInput.className = "task__input task__input_edit";
  editButton.innerText = "Edit";
  editButton.className = "task__button task__button_edit";

  deleteButton.className = "task__button task__button_delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Remove button";
  deleteButtonImg.className = "task__img_delete";
  deleteButton.appendChild(deleteButtonImg);

  // Append all elements to the list item
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Add a new task to the "to-do" list
const addTask = () => {
  console.log("Add Task...");
  if (!taskInput.value) return; // Prevent creation of empty tasks

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = ""; // Clear input after adding
};

// Edit an existing task
const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task__input");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".task__button_edit");
  const containsClass = listItem.classList.contains("task-editMode");

  if (containsClass) {
    // Save changes and switch back to view mode
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    // Switch to editmode
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task-editMode");
};

// Delete a task
const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

// Mark a task as completed
const taskCompleted = function () {
  console.log("Complete Task...");

  const listItem = this.parentNode;
  const label = listItem.querySelector(".task__label");
  label.className = "completed-task__label";
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete
const taskIncomplete = function () {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;
  const label = listItem.querySelector(".completed-task__label");
  label.className = "task__label";
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// Simulate an AJAX request (placeholder)
const ajaxRequest = () => {
  console.log("AJAX Request");
};

// Add event listeners to the "Add" button
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// Bind task events to actions like edit, delete, complete
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events");

  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector(".task__button_edit");
  const deleteButton = taskListItem.querySelector(".task__button_delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkBoxEventHandler);
};

// Bind events to existing "to-do" tasks
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Bind events to existing completed tasks
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester
