const loadData = async () => {
    await fetch('http://localhost:3000/api/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            toDoList = [...data];
            renderList();
        });
}

let toDoList = [];
const url = 'http://localhost:3000/api/';
const form = document.querySelector('form.addTask');
const ul = document.querySelector('ul.taskList');
const listItems = document.getElementsByClassName('task');
const input = document.querySelector('input');
loadData();

const removeTask = (e) => {
    const taskToRemove = toDoList.find((item) => {
        return item.task === e.target.previousElementSibling.innerText;
    });
    deleteTask(taskToRemove._id);
    toDoList = toDoList.filter((task) => {
        return task !== taskToRemove;
    })
    renderList();
}

const addTask = (e) => {
    e.preventDefault();
    const taskTitle = input.value;
    if (taskTitle === "") returns
    const response = postTask(taskTitle);
    response.then(res => {
        console.log('Post added');
        console.log(res);
        toDoList.push({
            task: res.task,
            _id: res._id
        });
        renderList();
    });
}

const renderList = () => {
    ul.textContent = "";
    input.value = "";

    if (toDoList.length === 0) {
        const label = document.createElement('p');
        label.innerHTML = `Brak zadań do wykonania`;
        ul.appendChild(label);
    }
    toDoList.forEach(({
        task
    }) => {
        let li = document.createElement("li");
        li.className = "task";
        li.innerHTML = `<span>${task}</span> <button>x</button>`;
        ul.appendChild(li);
        li.querySelector('button').addEventListener('click', removeTask);
    });
}


const postTask = async (newTask) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: newTask,
            author: 'zgredek'
        })
    });
    return await response.json();
}

const deleteTask = async (id) => {
    const response = await fetch(url + id, {
            method: 'DELETE'
        })
        .then(response => {
            response.json();
            console.log('Deleted task');
        })
        .catch(error => console.log(error));
    return await response;
}

form.addEventListener('submit', addTask);