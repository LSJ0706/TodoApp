'use client'
import {TodoListType} from './types/todoListType'
import uuid from 'react-uuid'
import { useCallback, useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const TodoApp = () => {
  const [todoList, setTodoList] = useState<TodoListType[]>(()=> {
    if (typeof window !== 'undefined') {
    const LocalTodoList = localStorage.getItem('todoList')
    console.log(LocalTodoList)
    return LocalTodoList ? JSON.parse(LocalTodoList) : []
    }
  });
  const [todo, setTodo] = useState<string>('');

  const addTodo = useCallback(() => {
    const newTodo : TodoListType = {
      id: uuid(),
      index : 1,
      content: todo,
      checked:false,
    };
    
    setTodoList(prev => [...prev, newTodo]);
    setTodo('');
  },[todo]);

  const deleteTodo = useCallback((id: string) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id))
  },[]);

  const checkTodo = useCallback((id: string) => {
    const copy = [...todoList]
    const copyIndex = copy.findIndex((todo) => todo.id === id);
    if(copyIndex === -1) {
      return;
    }
    copy[copyIndex].checked = !copy[copyIndex].checked
    setTodoList(copy)
  },[todoList])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  return (
    <>
    <div>
      <h1>To-Do App</h1>
      <input
      type="text"
      placeholder="To-Do 추가"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>추가하기</button>
    </div>
    <ul>
      {todoList.map((todo : any) =>(
        <li key={todo.id}
        >
          <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => {checkTodo(todo.id)}}/>

          <p className={todo.checked ? 'line-through' : 'font-bold'}>
            {todo.content}
            </p>

          <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
        </li>
      ))}
    </ul>
    </>
  )
}

export default TodoApp;