const url = 'http://localhost:3000/tasks';
let toDoList = [];
const form = document.querySelector('form.addTask');
const ul = document.querySelector('ul.taskList');
const listItems = document.getElementsByClassName('task');
const input = document.querySelector('input');
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const formShare = document.querySelector("form.share");
const inputSearch = document.getElementById("search-login");
const loginsDatalist = document.getElementById("logins-dt-id");
const username = localStorage.getItem('username');
let logins = [];
let newTaskToShare = '';

const removeTask = (e) => {
    const taskToRemove = toDoList.find((item) => {
        return item.task === e.target.offsetParent.parentNode.parentNode.innerText;
    });
    deleteTask(taskToRemove._id);
    toDoList = toDoList.filter((task) => {
        return task !== taskToRemove;
    });
    renderList();
}

const addTask = (e) => {
    e.preventDefault();
    const taskTitle = input.value;
    if (taskTitle === "") returns
    const response = postTask(taskTitle, username);
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
        li.innerHTML = `<span>${task}</span> 
        <div class="buttons">
            <button class="share">
                <i class="fas fa-share-square"></i>
            </button>
            <button class="delete"> 
                <i class="far fa-window-close"></i> 
            </button> 
        </div>
        `;
        ul.appendChild(li);
        li.querySelector('button.delete').addEventListener('click', removeTask);
        li.querySelector('button.share').addEventListener('click', toggleModal);
    });
}

const loadData = async () => {
    console.log(username);
    await fetch(url + `/${username}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.length > 1) toDoList = [...data];
            else if(data.length == 1) toDoList.push(data);
            renderList();
        });
}

const postTask = async (newTask, newAuthor) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: newTask,
            author: newAuthor
        })
    });
    return await response.json();
}

const deleteTask = async (id) => {
    const response = await fetch(url + `/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            response.json();
            console.log('Deleted task');
        })
        .catch(error => console.log(error));
    return await response;
}

const shareTask = (e) => {
    e.preventDefault();
    console.log('Clicked share button!');
    console.log(newTaskToShare);
    let user = logins.find(el => {
        return el === inputSearch.value;
    });
    console.log(user);
    if(user) {
        e.preventDefault();
        toggleModal();
        postTask(newTaskToShare, user);
        //newTaskToShare = '';
    }
    else {
        alert('Wybrano niepoprawną nazwe użytkownika');
    }
}

const loadLogins = async() => {
    const resp = await fetch('http://localhost:3000/login/all')
    .then(response => response.json())
    .then(data => {
        let output = '';
        data.forEach(element => {
            output += `<option value="${element}">`
            logins.push(element);
        });
        loginsDatalist.innerHTML = output;
    })
    .catch(error => {
        console.log(error);
    });
}

function toggleModal(e) {
    if(newTaskToShare === '') newTaskToShare = e.target.parentNode.parentNode.parentNode.innerText;
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

loadData();
loadLogins();
form.addEventListener('submit', addTask);
formShare.addEventListener('submit', shareTask);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);