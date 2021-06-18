import React, { useState } from "react";

import { TodoType } from "../types/todo";

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  deletedList: TodoType[];
  setDeletedList: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoList: React.VFC<Props> = props => {
  const {
    todos,
    setTodos,
    editText,
    setEditText,
    deletedList,
    setDeletedList
  } = props;

  const [editFlag, setEditFlag] = useState(false);

  const handleEdit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    if (!editText) {
      return;
    }

    setEditText("");
  };

  const handleDelete = (
    e: React.FormEvent<HTMLInputElement>,
    todoIndex: number
  ) => {
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

  return (
    <>
      <p>todoList</p>
      <ul>
        {todos.map((todo, todoIndex) => {
          return (
            <li key={todo.id}>
              {todo.value}
              {editFlag ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    placeholder="入力してください"
                    onChange={e => {
                      setEditText(e.target.value);
                    }}
                  />
                  <input
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      handleEdit(e);
                    }}
                    value="完了"
                  />
                </>
              ) : (
                ""
              )}
              <form>
                {editFlag ? (
                  <input
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      setEditFlag(!editFlag);
                    }}
                    onSubmit={() => setEditText("")}
                    value="キャンセル"
                  />
                ) : (
                  <>
                    <input
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                      }}
                      value="編集"
                    />
                    <input
                      type="button"
                      onClick={e => {
                        e.preventDefault();
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
