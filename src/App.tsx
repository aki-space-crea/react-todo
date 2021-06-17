import React, { useState } from "react";

type Todo = {
  value: string;
  id?: number;
};

const App: React.VFC = () => {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editFlag, setEditFlag] = useState(false);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    e.preventDefault();

    if (!text) {
      return;
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime()
    };

    setTodos([newTodo, ...todos]);

    setText("");
  };

  const handleEdit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();

    if (!editText) {
      return;
    }

    todos[index].value = editText;

    setEditText("");
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          value={text}
          placeholder="入力してください"
          onChange={e => setText(e.target.value)}
        />
        <input type="submit" value="登録" onSubmit={e => handleSubmit(e)} />
      </form>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={todo.id}>
              {todo.value}
              {editFlag ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    placeholder="入力してください"
                    onChange={e => setEditText(e.target.value)}
                  />
                  <input
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      setEditFlag(!editFlag);
                      handleEdit(e, index);
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
                  <input
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      setEditFlag(!editFlag);
                    }}
                    value="編集"
                  />
                )}
              </form>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default App;
