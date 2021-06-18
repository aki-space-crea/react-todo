import React, { useState } from "react";

type Todo = {
  value: string;
  id: number;
};

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Form: React.VFC<Props> = ({ todos, setTodos }) => {
  const [text, setText] = useState("");

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
    </>
  );
};

export default Form;
