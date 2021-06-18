import React, { useState } from "react";
import { TodoType } from "../types/todo";

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
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

    const newTodo: TodoType = {
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
