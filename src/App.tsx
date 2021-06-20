import React, { useState } from "react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import DeletedList from "./components/DeletedList";

import { TodoType } from "./types/todo";

const App: React.VFC = () => {
  const [tit, setTit] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [deletedList, setDeletedList] = useState<TodoType[]>([]);
  const [detail, setDetail] = useState<boolean>(false);
  const [detailTodo, setDetailTodo] = useState<TodoType[]>([]);
  const [detailText, setDetailText] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");

  return (
    <section>
      <h1>TODOアプリ</h1>
      <Form
        todos={todos}
        setTodos={setTodos}
        tit={tit}
        setTit={setTit}
        detailText={detailText}
        setDetailText={setDetailText}
        contactPerson={contactPerson}
        setContactPerson={setContactPerson}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        editText={editText}
        setEditText={setEditText}
        deletedList={deletedList}
        setDeletedList={setDeletedList}
        setDetail={setDetail}
        setDetailTodo={setDetailTodo}
      />
      <DeletedList
        deletedList={deletedList}
        setDetail={setDetail}
        setDetailTodo={setDetailTodo}
      />
      {detail ? (
        <section>
          <h2>ID</h2>
          <p>{detailTodo[0].id}</p>
          <h2>作成日時</h2>
          <p>{detailTodo[0].day}</p>
          <h2>更新日時</h2>
          <p>{detailTodo[0].upDateDay}</p>
          <h2>タイトル</h2>
          <p>{detailTodo[0].tit}</p>
          <h2>詳細</h2>
          <p>{detailTodo[0].detailText}</p>
          <h2>担当者</h2>
          <p>{detailTodo[0].contactPerson}</p>
        </section>
      ) : (
        ""
      )}
    </section>
  );
};

export default App;
