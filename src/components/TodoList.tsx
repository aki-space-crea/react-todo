import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { TodoType } from "../types/todo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& li": {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "16px",
        marginTop: "8px",

        "&:first-child": {
          marginRight: "0"
        }
      },
      "& .MuiButtonGroup-root.btn-wrap": {
        display: "flex",
        minWidth: "130px",

        "& button": {
          display: "block",
          borderRadius: "5px",

          "&:first-child": {
            marginRight: "8px"
          }
        }
      },
      "& .show-detail": {
        display: "block",
        marginTop: "8px",
        textAlign: "right",
        cursor: "pointer",
        textDecoration: "underline"
      }
    }
  })
);

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

  const classes = useStyles();

  const handleToggleEdit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
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
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
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
    e: React.FormEvent<HTMLButtonElement>,
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
      <List className={classes.root}>
        {todos.map((todo, todoIndex) => {
          const edit = todo.edit;

          return (
            <ListItem key={todo.id}>
              <Box display="flex" width="100%">
                <Box width="100%">
                  <p>{todo.tit}</p>
                </Box>
                {todo.edit ? (
                  <Box display="flex" flexWrap="wrap" width="100%">
                    <Box width="100%">
                      <TextField
                        required
                        id="outlined-required"
                        label="タイトル"
                        placeholder={todos[todoIndex].tit}
                        variant="outlined"
                        value={editTit}
                        onChange={e => {
                          setEditTit(e.target.value);
                        }}
                      />
                    </Box>
                    <Box width="100%" mt={2}>
                      <TextField
                        required
                        id="outlined-required"
                        label="詳細"
                        placeholder="詳細を入力してください"
                        variant="outlined"
                        value={editDetailText}
                        multiline
                        rows={4}
                        onChange={e => {
                          setEditDetailText(e.target.value);
                        }}
                      />
                    </Box>
                    <Box width="100%" mt={2}>
                      <TextField
                        required
                        id="outlined-required"
                        label="担当者"
                        placeholder="担当者を入力してください"
                        variant="outlined"
                        value={editContactPerson}
                        onChange={e => {
                          setEditContactPerson(e.target.value);
                        }}
                      />
                      <Box display="flex" justifyContent="flex-end" mt={1}>
                        <Box mr={1}>
                          <Button
                            onClick={e => {
                              handleEditTodo(e, todoIndex);
                            }}
                            variant="contained"
                            color="primary"
                          >
                            完了
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            onClick={e => {
                              handleToggleEdit(e, todoIndex);
                            }}
                            variant="contained"
                            color="secondary"
                          >
                            キャンセル
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
                <form>
                  {edit ? (
                    ""
                  ) : (
                    <Box>
                      <ButtonGroup className="btn-wrap">
                        <Button
                          onClick={e => {
                            handleToggleEdit(e, todoIndex);
                          }}
                          variant="contained"
                          color="primary"
                        >
                          編集
                        </Button>
                        <Button
                          onClick={e => {
                            handleDelete(e, todoIndex);
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          削除
                        </Button>
                      </ButtonGroup>
                      <p
                        className="show-detail"
                        onClick={() => changeDetail(todoIndex)}
                      >
                        詳細を見る
                      </p>
                    </Box>
                  )}
                </form>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default TodoList;
