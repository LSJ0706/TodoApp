'use client'
import uuid from 'react-uuid'
import { useCallback, useEffect, useState } from "react";

interface todoType {
  id : string;
  content : string;
  checked : boolean;
}

const TodoApp = () => {
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [todo, setTodo] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const addTodo = useCallback(() => {

    const newTodo : todoType = {
      id: uuid(),
      content: todo,
      checked:checked,
    };
    setTodoList(prev => [...prev, newTodo]);
    setTodo('');
  },[todo,checked]);

  const deleteTodo = useCallback((id: string) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id))
  },[todoList]);

  const checkTodo = useCallback((id: string) => {
    todoList.forEach((todo) => {
      console.log(todoList)
      if(todo.id === id) {
        todo.checked = todo.checked === false ? true : false
      }
    })
  },[checked])

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
      {todoList.map((todo) =>(
        <li key={todo.id}
        >
          <input
          type="checkbox"
          defaultChecked={todo.checked}
          onClick={() => {checkTodo(todo.id)}}/>

          <p className={todo.checked ? 'line-through' : 'underline'}>
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