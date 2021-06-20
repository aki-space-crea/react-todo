import React, { useState } from "react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";
import DeletedList from "./components/DeletedList";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { TodoType } from "./types/todo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& h1": {
        fontSize: "2.4rem",
        fontWeight: "bold"
      },
      "& h2": {
        fontSize: "1.4rem",
        fontWeight: "bold",
        marginTop: "24px",

        "&:first-child": {
          marginTop: "0"
        }
      }
    }
  })
);

const App: React.VFC = () => {
  const [tit, setTit] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [deletedList, setDeletedList] = useState<TodoType[]>([]);
  const [detail, setDetail] = useState<boolean>(false);
  const [detailTodo, setDetailTodo] = useState<TodoType[]>([]);
  const [detailText, setDetailText] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");

  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Box p={2}>
        <section>
          <Typography variant="h1">TODO</Typography>
          <Box display="flex">
            <Box width="50%" mr={2}>
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
            </Box>
            {detail ? (
              <Box mt="12px">
                <section>
                  <Typography variant="h2">ID</Typography>
                  <p>{detailTodo[0].id}</p>
                  <Typography variant="h2">作成日時</Typography>
                  <p>{detailTodo[0].day}</p>
                  <Typography variant="h2">更新日時</Typography>
                  <p>{detailTodo[0].upDateDay}</p>
                  <Typography variant="h2">タイトル</Typography>
                  <p>{detailTodo[0].tit}</p>
                  <Typography variant="h2">詳細</Typography>
                  <p>{detailTodo[0].detailText}</p>
                  <Typography variant="h2">担当者</Typography>
                  <p>{detailTodo[0].contactPerson}</p>
                </section>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </section>
      </Box>
    </main>
  );
};

export default App;
