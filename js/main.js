let toDoList = [];
const form = document.querySelector('form.addTask');
const ul = document.querySelector('ul.taskList');
const listItems = document.getElementsByClassName('task');
const input = document.querySelector('input');

const removeTask = (e) => {
    let index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1);
    renderList();
    if (toDoList.length === 0) {
        const label = document.createElement('p');
        label.innerHTML = `Brak zadań do wykonania`;
        ul.appendChild(label);
    }
}

const addTask = (e) => {
    e.preventDefault();
    const taskTitle = input.value;
    if (taskTitle === "") returns
    const newTask = document.createElement('li');
    newTask.className = "task";
    newTask.innerHTML = `<span>${taskTitle}</span> <button>x</button>`; /*<i class="far fa-trash-alt"></i>  */
    toDoList.push(newTask);
    renderList();
    ul.appendChild(newTask);
    input.value = "";
    newTask.querySelector('button').addEventListener('click', removeTask);
}

const renderList = () => {
    ul.textContent = "";
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ul.appendChild(toDoElement)
    })
}

form.addEventListener('submit', addTask);