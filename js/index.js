document.addEventListener("DOMContentLoaded", () => {
    const newTodo = document.getElementById("neuTodo");
    const addTodo = document.getElementById("addTodo");
    const tasksSection = document.querySelector(".tasks-section");
    const todoList = document.getElementById("todoList");
    const divFilter = document.querySelector(".taskFilter");
    const todoCountElement = document.querySelector(".todoCount strong");
    const deleteCompletedElement = document.querySelector("#deleteCompleted");
    const notcompletedTodoCountElement = document.querySelector(
        ".notcompletedTodoCount strong"
    );
    const completetTodoCountElement = document.querySelector(
        ".completedTodoCount strong"
    );
    const deleteNotCompletedButtElement = document.querySelector(
        "#deleteNotCompletedButt"
    );

    let m_todoList = [];

    const verifyTodoList = () => {
        if (todoList.children.length === 0) {
            console.log("todoList.children.length", todoList.children.length);
            tasksSection.style.display = "none";
        } else {
            tasksSection.style.display = "";
        }

        // let todoCounter = 0;
        // for (const item of todoList.children) {
        //     // console.log(item.classList.contains("completed")); //return true oder false
        //     if (!item.classList.contains("completed")) {
        //         todoCounter++;
        //     }
        // }
        todoCountElement.innerText = todoList.children.length;

        let completettodoCounter = 0;
        for (const item of todoList.children) {
            // console.log(item.classList.contains("completed")); //return true oder false
            if (item.classList.contains("completed")) {
                completettodoCounter++;
            }
        }
        completetTodoCountElement.innerText = completettodoCounter;

        if (completettodoCounter === 0) {
            console.log(deleteCompletedElement);
            deleteCompletedElement.style.display = "none";
        } else {
            deleteCompletedElement.style.display = "";
        }

        let notdone = 0;
        notdone = todoList.children.length - completettodoCounter;
        console.log("not dan ", notdone);

        notcompletedTodoCountElement.innerText = notdone;

        // for (const item of todoList.children) {
        //     // console.log(item.classList.contains("completed")); //return true oder false
        //     if (item.classList.contains("li:not(.completed)")) {
        //         notdone++;
        //     }
        // }
        console.log("not dan ", notdone);
        if (notdone === 0) {
            deleteNotCompletedButtElement.style.display = "none";
        } else {
            deleteNotCompletedButtElement.style.display = "";
        }
    };

    verifyTodoList();
    const doneDeletetask = (liElement) => {
        const checkboxElement = liElement.querySelector(".checkInput");
        const deleteButtonElement = liElement.querySelector(".delete");

        // console.log("liElement", liElement.innerText);

        checkboxElement.addEventListener("change", () => {
            if (checkboxElement.checked) {
                liElement.classList.add("completed");
            } else {
                liElement.classList.remove("completed");
            }
            verifyTodoList();
        });

        deleteButtonElement.addEventListener("click", () => {
            liElement.remove();
            verifyTodoList();
        });

        if (todoList.children.length > 0) {
            console.log("todoList.children.length ", todoList.children.length);
            const deleteAllButtonElement =
                document.querySelector("#deleteAllButton");
            // deleteAllButtonElement.style.display = "";
            console.log(deleteAllButtonElement);

            deleteAllButtonElement.addEventListener("click", () => {
                for (let item of todoList.children) {
                    item.remove();
                    verifyTodoList();
                }
            });
        }

        let completettodoCounter = 0;
        for (const item of todoList.children) {
            // console.log(item.classList.contains("completed")); //return true oder false
            if (item.classList.contains("completed")) {
                completettodoCounter++;
            }
        }
        console.log("completettodoCounter", completettodoCounter);
    };

    addTodo.addEventListener("click", handleButtonClick);

    function handleButtonClick() {
        if (newTodo.value !== "") {
            const liElement = document.createElement("li");

            const divContainer = document.createElement("div");
            const inputCheckbox = document.createElement("input");
            const toDoText = document.createElement("input");

            const divButton = document.createElement("div");
            const editBtn = document.createElement("button");
            const editIcon = document.createElement("div");
            const deleteBtn = document.createElement("button");
            const deleteIcon = document.createElement("div");

            editIcon.classList.add("editIcon");
            editIcon.classList.add("fa");
            editIcon.classList.add("fa-edit");

            editBtn.classList.add("edit");
            editBtn.appendChild(editIcon);

            deleteIcon.classList.add("deleteIcon");
            deleteIcon.classList.add("fa");
            deleteIcon.classList.add("fa-trash-o");

            // deleteBtn.innerText = deleteIcontext;
            deleteBtn.classList.add("delete");
            deleteBtn.appendChild(deleteIcon);

            //Local speicher
            const todoElement = { name: newTodo.value };
            m_todoList.push(todoElement);

            const jsonToDoList = JSON.stringify(m_todoList);
            localStorage.setItem("todoList", jsonToDoList);

            toDoText.classList.add("todoText");
            // toDoText.classList.add("container");
            toDoText.type = "text";
            toDoText.setAttribute("readonly", "readonly");

            toDoText.value = newTodo.value;

            inputCheckbox.type = "checkbox";
            inputCheckbox.classList.add("checkInput");

            // divContainer.classList.add("divToDo");
            divContainer.setAttribute("id", "divTodoTask");

            liElement.classList.add("liElement");

            divButton.classList.add("button");
            divButton.appendChild(editBtn);
            divButton.appendChild(deleteBtn);

            divContainer.appendChild(inputCheckbox);

            divContainer.appendChild(toDoText);
            liElement.appendChild(divContainer);
            liElement.appendChild(divButton);

            todoList.prepend(liElement);
            doneDeletetask(liElement);

            newTodo.value = "";

            editTask();
            verifyTodoList();
        }
    }

    newTodo.addEventListener("change", (event) => {
        if (newTodo.value !== "") {
            console.log(newTodo.value);
        }
    });

    deleteCompletedElement.addEventListener("click", (event) => {
        const completedLiElements = todoList.querySelectorAll("li.completed");
        for (const completedLiElement of completedLiElements) {
            completedLiElement.remove();
        }
        verifyTodoList();
    });

    function editTask() {
        const editIcon = document.querySelector(".editIcon");
        const toDoText = document.querySelector(".todoText");

        editIcon.addEventListener("click", (event) => {
            if (editIcon.classList.contains("fa-edit")) {
                editIcon.classList.remove("fa-edit");
                editIcon.classList.add("fa-save");
                // editIcon.classList.add("saveIcon");
                toDoText.removeAttribute("readonly");
                toDoText.focus();
            } else {
                editIcon.classList.remove("fa-save");
                editIcon.classList.add("fa-edit");
                toDoText.setAttribute("readonly", "readonly");
            }
        });
    }

    deleteNotCompletedButtElement.addEventListener("click", (event) => {
        console.log(deleteNotCompletedButtElement);
        const completedLiElements =
            todoList.querySelectorAll("li:not(.completed)");
        for (const completedLiElement of completedLiElements) {
            completedLiElement.remove();
        }
        verifyTodoList();
    });
});
