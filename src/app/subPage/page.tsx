'use client'
import uuid from 'react-uuid'
import { useCallback, useEffect, useState } from "react";

interface todoType {
  id : string;
  content : string;
  checked : boolean;
}

const TodoApp = () => {
  const [todoList, setTodoList] = useState<todoType[]>(()=> {
    var LocalTodoList;    
    if (typeof window !== 'undefined') {
    LocalTodoList = localStorage.getItem('todoList')
    }
    return LocalTodoList ? JSON.parse(LocalTodoList) : []
  });
  const [todo, setTodo] = useState<string>('');

  const addTodo = useCallback(() => {
    const newTodo : todoType = {
      id: uuid(),
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
      localStorage.setItem('todoList', JSON.stringify(todoList))
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
          defaultChecked={todo.checked}
          onChange={() => {checkTodo(todo.id)}}/>

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