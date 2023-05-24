// TODO

// Model
const state = {
  todos: [
    { id: 1, value: 'first', completed: false, isEditing: false },
    { id: 2, value: 'second', completed: false, isEditing: false },
  ], // {id: number, value: string, completed: boolen, isEditing: boolen}
  currentTab: 'ALL',
};

// let count = 0

// Controller

//push the value of todovalue to todos whenadd button is pressed
function createTodo(todoValue) {
  const newTodo = {
    id: new Date().valueOf(),
    value: todoValue,
  };

  state.todos.push(newTodo);
  renderView();
}

//delete the elemnt when delete button is pressed
function deleteTodo(todoId) {
  const newTodos = state.todos.filter(function (todo) {
    return todo.id !== todoId;
  });

  state.todos = newTodos;
  renderView();
}

//change the complete status when checkbox is clicked
function toggleTodoComplete(todoId) {
  const taretTodo = state.todos.find(function (todo) {
    return todo.id === todoId;
  });

  if (taretTodo) {
    taretTodo.completed = !taretTodo.completed;
  }

  renderView();
}

//change the isEditing status when edit is clicked
function toggleTodoEditing(todoId) {
  const taretTodo = state.todos.find(function (todo) {
    return todo.id === todoId;
  });

  if (taretTodo) {
    taretTodo.isEditing = !taretTodo.isEditing;
  }

  renderView();
}

//When the confirm. button is clicked, we need to update the value to the value in the input box and make sure that it's not in edit mode.
function handelEditConfirm(todoId, inputValue) {
  const newTodos = state.todos.map(function (todo) {
    if (todo.id === todoId) {
      return {
        // id: todo.id,
        // value: inputValue,
        ...todo,
        value: inputValue,
        completed: todo.completed,
        isEditing: false,
      };
    } else {
      return todo;
    }
  });

  state.todos = newTodos;

  renderView();
}

//create the elements. There are two conditions: if the editing is true, we need to show the editing line.
function createTodoNode(todo) {
  const li = document.createElement('li');
  li.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.className = 'check-box';
  checkbox.checked = todo.completed;

  if (todo.isEditing) {
    checkbox.disabled = true;
  }

  checkbox.type = 'checkbox';

  if (!todo.isEditing) {
    const span = document.createElement('span');
    if (todo.completed) {
      span.className = 'strike';
    }
    // span.className = 'strike';

    span.innerHTML = todo.value;

    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.className = 'edit-btn';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';

    // deleteBtn.addEventListener('click', function () {
    //   console.log('delete btn is clicked');
    //   deleteTodo(todo.id);
    // });

    deleteBtn.innerHTML = 'Delete';

    li.append(checkbox, span, editBtn, deleteBtn);
  } else {
    const input = document.createElement('input');
    input.value = todo.value;
    input.className = 'edit-input';

    const confirmBtn = document.createElement('button');
    confirmBtn.innerHTML = 'confirm';
    confirmBtn.className = 'confirm-btn';

    const cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = 'cancel';
    cancelBtn.className = 'cancel-btn';

    li.append(checkbox, input, confirmBtn, cancelBtn);
  }
  return li;
}

//We need to set the currenttab to the tab button that is clicked
function setActiveTab(tabId) {
  state.currentTab = tabId;
  renderView();
}
//we need to only keep the not completed elements when clear completed button is clicked.
function clearCompleted() {
  const activeTodos = state.todos.filter(function (todo) {
    return !todo.completed;
  });
  state.todos = activeTodos;
  renderView();
}

// View
function renderView() {
  const todosContainer = document.querySelector('.todos-container');

  todosContainer.innerHTML = '';
  //when the current tab is active, we show not completed elements.
  //when the currrent tab is completed, we show the completed elements.
  //when tab is all, we show every thing
  state.todos
    .filter(function (todo) {
      if (state.currentTab === 'ACTIVE') {
        return !todo.completed;
      } else if (state.currentTab === 'COMPLETED') {
        return todo.completed;
      } else {
        return true;
      }
    })
    .forEach(function (todo) {
      const li = createTodoNode(todo);
      todosContainer.append(li);
    });

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    if (tab.id === state.currentTab) {
      tab.className = 'tab active';
    } else {
      tab.className = 'tab';
    }
  });
  //view for the left text. Show the number of active elements
  const textLeft = document.querySelector('#items-left-text');
  const activeTodo = state.todos.filter(function (todo) {
    return !todo.completed;
  });
  if (activeTodo.length > 1) {
    textLeft.innerHTML = `${activeTodo.length} items left`;
  } else {
    textLeft.innerHTML = `${activeTodo.length} item left`;
  }
}

const todoInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#add-btn');
const todosContainer = document.querySelector('.todos-container');
const tabsContainer = document.querySelector('.tabs-container');
const clearButton = document.querySelector('#clear-completed');

todosContainer.addEventListener('click', function (event) {
  console.log('todosContainer is clicked', event.target);

  const elem = event.target;

  if (elem.className === 'delete-btn') {
    // handle delete
    const li = elem.parentElement;
    const todoId = Number(li.id);
    deleteTodo(todoId);
  } else if (elem.className === 'check-box') {
    console.log('checkbox is clicked');
    const li = elem.parentElement;
    const todoId = Number(li.id);
    toggleTodoComplete(todoId);
  } else if (elem.className === 'edit-btn') {
    console.log('edit button is clicked');
    const li = elem.parentElement;
    const todoId = Number(li.id);
    toggleTodoEditing(todoId);
  } else if (elem.className === 'cancel-btn') {
    console.log('cancel button is clicked');
    const li = elem.parentElement;
    const todoId = Number(li.id);
    toggleTodoEditing(todoId);
  } else if (elem.className === 'confirm-btn') {
    console.log('confirm button is clicked');
    const li = elem.parentElement;
    const todoId = Number(li.id);
    const input = document.querySelector('.edit-input');
    handelEditConfirm(todoId, input.value);
  }

  // deleteTodo(todo.id);
});

//if tabs button is clicked, we need to set active tab to show the elements under the corresponding tab
tabsContainer.addEventListener('click', function (event) {
  if (event.target.className === 'tab') {
    const tabId = event.target.id;
    setActiveTab(tabId);
  }
});
//if the add button is clicked, we need to create a new line containing the value in the input box
addButton.addEventListener('click', function () {
  const todoValue = todoInput.value;
  createTodo(todoValue);
  todoInput.value = '';
});
//if the clear button is pressed, we need to clear all completed eleements
clearButton.addEventListener('click', function () {
  clearCompleted();
});

renderView();
