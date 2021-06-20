import React, { useState } from "react";

import { TodoType } from "../types/todo";

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  deletedList: TodoType[];
  setDeletedList: React.Dispatch<React.SetStateAction<TodoType[]>>;
  setDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailTodo: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoList: React.VFC<Props> = props => {
  const {
    todos,
    setTodos,
    editText,
    setEditText,
    deletedList,
    setDeletedList,
    setDetail,
    setDetailTodo
  } = props;

  const handleToggleEdit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
    todoIndex: number
  ) => {
    e.preventDefault();

    const deepCopyTodo = JSON.parse(JSON.stringify(todos));

    if (todos[todoIndex].edit) {
      // キャンセルボタンを押した後
      deepCopyTodo[todoIndex].edit = false;
    } else {
      // 編集ボタンを押した後
      deepCopyTodo[todoIndex].edit = true;
    }

    setTodos(deepCopyTodo);

    if (!editText) {
      return;
    }

    setEditText("");
  };

  const [editTit, setEditTit] = useState("");
  const [editDetailText, setEditDetailText] = useState("");
  const [editContactPerson, setEditContactPerson] = useState("");

  const handleEditTodo = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
    todoIndex: number
  ) => {
    e.preventDefault();

    if (!editTit || !editDetailText || !editContactPerson) {
      return;
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    const deepCopyTodo = JSON.parse(JSON.stringify(todos));

    deepCopyTodo[todoIndex].tit = editTit;
    deepCopyTodo[todoIndex].detailText = editDetailText;
    deepCopyTodo[todoIndex].contactPerson = editContactPerson;
    deepCopyTodo[todoIndex].upDateDay = `${year}/${month}/${day}`;

    setTodos(deepCopyTodo);

    deepCopyTodo[todoIndex].edit = false;

    setEditTit("");
    setEditDetailText("");
    setEditContactPerson("");
  };

  const handleDelete = (
    e: React.FormEvent<HTMLInputElement>,
    todoIndex: number
  ) => {
    e.preventDefault();

    const copyTodos = [...todos];
    const deletedTodo: TodoType[] = copyTodos.filter((_, index) => {
      return todoIndex === index;
    });

    const notDeletedTodo: TodoType[] = copyTodos.filter((_, index) => {
      return todoIndex !== index;
    });

    setTodos(notDeletedTodo);
    setDeletedList([deletedTodo[0], ...deletedList]);
  };

  const changeDetail = (todoIndex: number) => {
    // 詳細画面初期化
    setDetail(false);
    setDetail(true);

    setDetailTodo([todos[todoIndex]]);
  };

  return (
    <>
      <p>todoList</p>
      <ul className="todo-list">
        {todos.map((todo, todoIndex) => {
          const edit = todo.edit;
          return (
            <li key={todo.id} onClick={() => changeDetail(todoIndex)}>
              {todo.tit}
              {todo.edit ? (
                <>
                  <div className="input-area">
                    <label>タイトル</label>
                    <input
                      type="text"
                      value={editTit}
                      placeholder={todos[todoIndex].tit}
                      required
                      onChange={e => {
                        setEditTit(e.target.value);
                      }}
                    />
                  </div>
                  <div className="input-area">
                    <label>詳細</label>
                    <textarea
                      name=""
                      id=""
                      cols={30}
                      rows={10}
                      value={editDetailText}
                      placeholder={todos[todoIndex].detailText}
                      required
                      onChange={e => {
                        setEditDetailText(e.target.value);
                      }}
                    ></textarea>
                  </div>{" "}
                  <div className="input-area">
                    <label>担当者</label>
                    <input
                      type="text"
                      value={editContactPerson}
                      placeholder={todos[todoIndex].contactPerson}
                      required
                      onChange={e => {
                        setEditContactPerson(e.target.value);
                      }}
                    />
                    <input
                      type="button"
                      onClick={e => {
                        handleEditTodo(e, todoIndex);
                      }}
                      value="完了"
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              <form>
                {edit ? (
                  <input
                    type="button"
                    onClick={e => {
                      handleToggleEdit(e, todoIndex);
                    }}
                    value="キャンセル"
                  />
                ) : (
                  <>
                    <input
                      type="button"
                      onClick={e => {
                        handleToggleEdit(e, todoIndex);
                      }}
                      value="編集"
                    />
                    <input
                      type="button"
                      onClick={e => {
                        handleDelete(e, todoIndex);
                      }}
                      value="削除"
                    />
                  </>
                )}
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
