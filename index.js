const helmet = require('helmet');
const mongoose=require('mongoose');
const express=require('express');
const compression = require('compression');
const app = express();
const Joi=require('joi');
const path = require('path');
app.use(express.static(__dirname + '/public'));
app.use('/css',express.static(__dirname +'/css'));
app.use('/js',express.static(__dirname +'/js'));
app.use(express.json());
app.use(helmet());
app.use(compression());

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

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
   
});


app.get('/index.html',async (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/registration.html',async (req, res) => {
    res.sendFile(path.join(__dirname + '/registration.html'));
});

app.get('/login.html',async (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
});


app.get('/data',async (req, res) => {
    const todos=await Todo.find();
    res.send(todos);
});


  app.post('/',async (req, res) => {

      const {error} = validateTodo(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      let todo = new Todo({  name: req.body.name });
      todo=await todo.save();
      res.send(todo);
  });

app.put('/:id',async (req, res) => {
    const {error} = validateTodo(req.body);
    if (error)   return res.status(400).send(error.details[0].message);

    const todo = await Todo.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new: true
    });

    if (!todo)  return res.status(404).send('broken id ');

    res.send(todo);

});

app.delete('/:id',async (req, res)=> {
    const todo = await Todo.findByIdAndRemove(req.params.id);

    if (!todo) return res.status(404).send('broken id ');

    res.send(todo);
})

app.get('/:id',async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).send('broken id ');

    res.send(todo);
})




async function getTodos(notatka,autor){ 
let todos;
let lista=[];
     todos=await Todo
    .find({
        author:autor,
        name:notatka
    })
   lista.push(...todos); //wpisanie do pustej tablicy danych w formacie JSON 
   lista.map(list=>{
       console.log(list.name);
   });
} //getTodos('przykladowa notatka'); //przyklad wyswietlenia sie notatki

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
}  // createTodo('przykladowa notatka', 'przykladowy_autor'); // przyklad dodania notatki

async function removeTodo(notatka,autor){ 
    const result=await Todo.deleteOne({name:notatka, author:autor});
 console.log(result);
} //removeTodo('wisuje tez autora', 'Damian'); //przyklad usuniecie notatki
//removeTodo('prosto', 'oskar');


function validateTodo(todo){

    const schema={
        name: Joi.string().min(3).required() ,
        author:Joi.string().min(3).required()
};

return Joi.validate(todo, schema);
} 



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`)); 