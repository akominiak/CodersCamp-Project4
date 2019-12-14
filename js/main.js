const mongoose=require('mongoose');

//polaczenie z bazą
mongoose.connect('mongodb://localhost/todoList')
.then(()=>console.log('Connected to todo List Base'))
.catch(err=>console.error('Could not connect to todo List Base',err));

const Todo=mongoose.model('Todo',new mongoose.Schema({ 
    name: {
        type: String,
         required: true,
        minlength:1,
        maxlength:50
        },
    author: {
        type:String
        } 
})); 

let todos;
let lista=[];
async function getTodos(notatka,autor){ 
     todos=await Todo
    .find({
        author:autor,
        name:notatka
    })
   lista.push(...todos); //wpisanie do pustej tablicy danych w formacie JSON 
   lista.map(list=>{
       console.log(list.name);
   });
} // getTodos('tekst notatki ktory ktos wpisal','autor_tej_notatki'); //przyklad wyswietlenia sie notatki

async function createTodo(notatka,autor){
    const todo= new Todo({
        name: notatka,  
        author: autor  
    });
    try{const result =await todo.save();
        console.log(result);}
     
     catch (ex) {
         console.log(ex.message);
     }
} //  createTodo('przykladowa notatka', 'przykladowy_autor'); przyklad dodania notatki

async function removeTodo(notatka,autor){ 
    const result=await Todo.deleteOne({name:notatka, author:autor});
 console.log(result);
} //removeTodo('tekst notatki ktory ktos wpisal', 'autor notatki'); //przyklad usuniecie notatki


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