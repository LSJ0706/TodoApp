"use client";
import { TodoListType } from "./types/todoListType";
import uuid from "react-uuid";
import { useCallback, useEffect, useState } from "react";
import React from "react";

const TodoApp = () => {
  const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [todo, SetTodo] = useState<string>("");

  const list = todoList.map((todo: any) => (
    <li key={todo.id}>
      <p>{todo.content}</p>
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => console.log("check")}
      />
    </li>
  ));

  const addTodo = useCallback(() => {
    setTodoList((prevTodo) => {
      const newTodo: TodoListType = {
        id: uuid(),
        index: 1,
        content: todo,
        checked: false,
      };
      return [...prevTodo, newTodo];
    });
    console.log(todoList);
  }, [todo, todoList]);

  return (
    <>
      <h2>Todo-App</h2>
      <div>
        <input
          placeholder="To Do 입력"
          value={todo}
          onChange={(e) => SetTodo(e.target.value)}
        />
        <button onClick={addTodo}>add Todo</button>
      </div>
      <ul>{list}</ul>
    </>
  );
};

export default TodoApp;
