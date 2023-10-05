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
  const [todo, setTodo] = useState<string>('')

  const addTodo = useCallback(() => {

    const newTodo : todoType = {
      id: uuid(),
      content: todo,
      checked:false,
    };

    setTodoList((prev => [...prev, newTodo])) 
  },[todo]);

  const deleteTodo = useCallback((id: string) => {
    console.log('삭제')
    setTodoList((prev) => prev.filter((todo) => todo.id ! == id));
  },[]);

  useEffect(() => {

  },[todoList])
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
        <li key={todo.id}>
          <input
          type="checkbox"
          checked={todo.checked}
          />
          {todo.content}
          <button onClick={() => deleteTodo(todo.id)}>삭제하기</button>
        </li>
      ))}
    </ul>
    </>
  )
}

export default TodoApp;