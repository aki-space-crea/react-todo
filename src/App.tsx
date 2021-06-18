import React, { useState } from "react";

import Form from "./components/Form";

type Todo = {
  value: string;
  id: number;
};

const App: React.VFC = () => {
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editFlag, setEditFlag] = useState(false);
  const [deletedList, setDeletedList] = useState<Todo[]>([]);

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
    const deletedTodo: Todo[] = copyTodos.filter((_, index) => {
      return todoIndex === index;
    });

    const notDeletedTodo: Todo[] = copyTodos.filter((_, index) => {
      return todoIndex !== index;
    });

    setTodos(notDeletedTodo);
    setDeletedList([deletedTodo[0], ...deletedList]);
  };

  return (
    <>
      <Form todos={todos} setTodos={setTodos} />
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
      <p>deletedList</p>
      <ul>
        {deletedList.map(deletedItem => {
          return <li key={deletedItem.id}>{deletedItem.value}</li>;
        })}
      </ul>
    </>
  );
};

export default App;
