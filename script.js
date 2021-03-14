let todoInput = document.querySelector('.todo_input');
let todoButton = document.querySelector('.todo_botton');
let todoList = document.querySelector('.todo_list');
let filterList = document.querySelector('.filter_todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTask)
filterList.addEventListener('click', filterTask)
window.addEventListener('DOMContentLoaded', getTodos)



function addTodo(e){
    e.preventDefault();

    //if input is empty
    if(todoInput.value == ""){
        alert('please add task')
        todoList.removeChild(todoDiv)
    }
    
    // Create Div which contains list and btn
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI list
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    //clear input value
  
    todoDiv.appendChild(newTodo);

    //save to local Storage
    saveLocalTodos(todoInput.value)

    //checked btn
    const checkedTask = document.createElement('button');
    checkedTask.innerHTML = '<i class="fas fa-check"></i>';
    checkedTask.classList.add("checked-btn");
    todoDiv.appendChild(checkedTask);

    //delete btn
    const deleteTask = document.createElement('button');
    deleteTask.innerHTML = '<i class="fas fa-trash"></i>';
    deleteTask.classList.add("delete-btn");
    todoDiv.appendChild(deleteTask);
    
    //append to todolist
    todoList.appendChild(todoDiv)
    todoInput.value ="";
}

function deleteTask(e){
    // console.log(e.target);

    let items = e.target;

    //delete
    if(items.classList[0] == "delete-btn"){
        const todo = items.parentElement;
        // removeFrom local
        removeTodo(todo)
        //animation
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
        // console.log(todo);
     
    }

    //checked
    if(items.classList[0] == "checked-btn"){
        const todo = items.parentElement;
        // console.log(todo);
        todo.classList.toggle("completed")
    }
}

function filterTask(e){
  
    let todos = todoList.childNodes
    // console.log(todos);

    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case 'completed':
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
                case 'uncompleted':
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    } else{
                        todo.style.display = "none";
                    }
                    break;
        }
    })
}

function saveLocalTodos(todo){
    //check if there is already have thing in there?
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
         // Create Div which contains list and btn
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create LI list
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    //clear input value
  
    todoDiv.appendChild(newTodo);

    //checked btn
    const checkedTask = document.createElement('button');
    checkedTask.innerHTML = '<i class="fas fa-check"></i>';
    checkedTask.classList.add("checked-btn");
    todoDiv.appendChild(checkedTask);

    //delete btn
    const deleteTask = document.createElement('button');
    deleteTask.innerHTML = '<i class="fas fa-trash"></i>';
    deleteTask.classList.add("delete-btn");
    todoDiv.appendChild(deleteTask);
    
    //append to todolist
    todoList.appendChild(todoDiv)
    })
}

function removeTodo(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex,1));

    localStorage.setItem("todos", JSON.stringify(todos))
}