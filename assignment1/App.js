import './App.css';

import { useState, useReducer } from 'react';


import Todo from './Todo';
import Completed from './Completed';

function App() {
  const [state, setState] = 
  useState({ todo: [ {id: "todo-0", task: "Mastering JavaScript"}],
    completed: [{id: "todo-1", task: "Learn Coding"}]});

  const [i, setI]=useState(2);
  const forceUpdate = useReducer(() => ({}))[1];

  const addItem = () => {
    const value=document.getElementById('new-task').value;
    document.getElementById('new-task').value='';
    let newState= state;
    const member = {id: "todo-"+i, task: value};
    setI(i+1);
    newState.todo.push(member);
    setState(newState);
  };

  const movetoCompleted = (iden, tasken) => {
    let newState= state;
    const member = {id: iden, task: tasken};
    newState.completed.push(member);
    newState.todo.splice(newState.todo.findIndex(element => element.id===iden),1);
    setState(newState);
    forceUpdate();
  }

  const movetodo = (iden,tasken) => {
    let newState = state;
    const member = { id: iden , task: tasken}
    newState.todo.push(member);
    newState.completed.splice(newState.completed.findIndex(element => element.id===iden),1);
    setState(newState);
    forceUpdate();
  }

  const saveItem = function (inputValue, iden, type) {   
    const list = state[type]
    const index = list.findIndex(element => element.id === iden);
    list[index].task=inputValue;
    let newState = {...state, [type]: list};
    setState(newState);
  }

  const deleteItem = (list, iden) => {
    let newState = state;
    newState[list].splice(newState[list].findIndex(element => element.id === iden),1);
    setState(newState);
    forceUpdate();
  }

  const todolist = state.todo.map(item => 
    < Todo
        task={item.task}
        id={item.id}
        key={item.id}
        movetoCompleted={() => movetoCompleted(item.id, item.task)}
        deleteItem={deleteItem}
        saveItem={saveItem}
    />
    );

  const completedlist = state.completed.map(item => 
    < Completed
        task={item.task}
        id={item.id}
        key={item.id}
        movetodo={() => movetodo(item.id,item.task)}
        deleteItem={deleteItem}
        saveItem={saveItem}
    />
    );  

  return (
    <div className="container" >
      <p> 
        <label htmlFor="new-task">Add Item</label>
        <input id="new-task" type="text" />
        <button onClick={() => addItem()} type="submit"> Add</button> 
      </p>

      <h3>Todo</h3> 
        <ul id="incomplete-tasks">
        {todolist}
        </ul>

      <h3>Completed</h3> 
        <ul id="completed-tasks"> 
        {completedlist}
        </ul> 
    </div>
  );
}

export default App;
