"use client";
import { TodoListType } from "./types/todoListType";
import uuid from "react-uuid";
import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React from "react";

const TodoApp = () => {
  const [todoList, setTodoList] = useState<TodoListType[]>([]);
  const [todo, SetTodo] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(false);

  const addTodo = useCallback(() => {
    setTodoList((prevTodo) => {
      const newTodo: TodoListType = {
        id: uuid(),
        index: todoList.length,
        content: todo,
        checked: false,
      };
      SetTodo("");
      return [...prevTodo, newTodo];
    });
  }, [todo, todoList]);

  const deleteTodo = useCallback(
    (id: string) => {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    },
    [todoList]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const orderTodoList = Array.from(todoList);
      const [reorderedTodoList] = orderTodoList.splice(result.source.index, 1);
      orderTodoList.splice(result.destination.index, 0, reorderedTodoList);
      const updateTodoList = orderTodoList.map((todo, index) => ({
        ...todo,
        index,
      }));
      setTodoList(updateTodoList);
    },
    [todoList]
  );
  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <>
      <h2>Todo-App</h2>
      <div>
        {/*toDo 입력*/}
        <input
          placeholder="To Do 입력"
          value={todo}
          onChange={(e) => SetTodo(e.target.value)}
        />
        <button onClick={addTodo}>add Todo</button>
      </div>
      {/*dnd context 공간*/}
      <DragDropContext onDragEnd={onDragEnd}>
        {/*drop을 할 conponent*/}
        <Droppable droppableId="todo">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todoList.map((todo: any, index: number) => (
                /*drag를 할 component*/
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {todo.index}
                      {todo.content}
                      <input
                        type="checkbox"
                        checked={todo.checked}
                        onChange={() => console.log("check")}
                      />
                      <button onClick={() => deleteTodo(todo.id)}>
                        삭제하기
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {/*이건 왜 꼭 필요한거지?
              => 드롭 대상의 크기와 위치를 임시로 나타내는 역할. 시각적으로 피드백을 제공.
              */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default TodoApp;
