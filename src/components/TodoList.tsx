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

  const handleEditText = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>,
    todoIndex: number
  ) => {
    e.preventDefault();

    if (!editText) {
      return;
    }

    const deepCopyTodo = JSON.parse(JSON.stringify(todos));

    deepCopyTodo[todoIndex].value = editText;

    setTodos(deepCopyTodo);

    // キャンセルボタンを押した後
    deepCopyTodo[todoIndex].edit = false;
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
          const edit = todo.edit;
          return (
            <li key={todo.id}>
              {todo.value}
              {todo.edit ? (
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
                      handleEditText(e, todoIndex);
                    }}
                    value="完了"
                  />
                </>
              ) : (
                ""
              )}
              <form>
                {edit ? (
                  <input
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      handleToggleEdit(e, todoIndex);
                    }}
                    value="キャンセル"
                  />
                ) : (
                  <>
                    <input
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        handleToggleEdit(e, todoIndex);
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
