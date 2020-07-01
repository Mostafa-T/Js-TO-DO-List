// Selectors 
const todoBtn = document.querySelector('.todo-btn');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const errorMesg = document.querySelector('.error-message');
const filterBtn = document.querySelector('.filter-btn');

// Focus on the todo input 
todoInput.focus();

// Onclick Event
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterBtn.addEventListener('click', todoFilter );

// Function
function addTodo (e) {
  //prevent default form Action
  e.preventDefault();

    //check if the input is null
    if(todoInput.value === "") {
      errorMesg.classList.add('error-message-open'); 
      setTimeout(function () {
        errorMesg.classList.remove('error-message-open');
      }, 1500)
      todoDiv.remove();
    }


  //create Todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo-div');

  // create list
  const todoItem = document.createElement('li');
  todoItem.textContent = todoInput.value;
  todoItem.classList.add('todo-item');
  todoDiv.appendChild(todoItem);
  //Add todos to local storage
  saveLocalTodos();
  
  // create div for the buttons  
  const btnDiv =  document.createElement('div');
  btnDiv.classList.add('btn-div');
  todoDiv.appendChild(btnDiv);

  // Create checked button
  const checkedBtn = document.createElement('button');
  checkedBtn.classList.add('checked-btn');
  checkedBtn.innerHTML = '<i class="fas fa-check"></i>';
  btnDiv.appendChild(checkedBtn);

  //Create Remove Button
  const RemoveBtn = document.createElement('button');
  RemoveBtn.classList.add('remove-btn');
  RemoveBtn.innerHTML = ' <i class="far fa-trash-alt"></i> ';
  btnDiv.appendChild(RemoveBtn);


  // add todDiv to the todo list
  todoList.appendChild(todoDiv);

  //clear input Value 
  todoInput.value = "";

};

function deleteCheck (e) {
  'use strict';
  
  const item = e.target;
  //check if the clicked item has the delete class then remove the div
  if(item.classList.contains('remove-btn')) {
   const todo = item.parentElement.parentElement;
   // Animation
   todo.classList.add('remove');
   todo.addEventListener('transitionend', function () {
     todo.remove();
   })
  }
  // if the clicked item has the check class add a line through 
  if(item.classList.contains('checked-btn')) {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle('completed');
  }
}

function todoFilter (e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo){
    switch(e.target.value) {
      case "all": {
        todo.style.display = "flex";
        break;
      }
      case "completed": {
        if(todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else 
          todo.style.display = "none";
      }
      break;
      case "uncompleted": {
        if(!todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      }
      break;
    }
    
  })
};

function saveLocalTodos (todo) {
  let todos;
  
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
};