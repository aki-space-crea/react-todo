import React, { useState } from "react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import DeletedList from "./components/DeletedList";

import { TodoType } from "./types/todo";

const App: React.VFC = () => {
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [deletedList, setDeletedList] = useState<TodoType[]>([]);

  return (
    <>
      <Form todos={todos} setTodos={setTodos} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        editText={editText}
        setEditText={setEditText}
        deletedList={deletedList}
        setDeletedList={setDeletedList}
      />
      <DeletedList deletedList={deletedList} />
    </>
  );
};

export default App;
