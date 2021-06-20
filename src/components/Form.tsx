import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { TodoType } from "../types/todo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginTop: theme.spacing(1),
        width: "100%"
      }
    }
  })
);

type Props = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  tit: string;
  setTit: React.Dispatch<React.SetStateAction<string>>;
  detailText: string;
  setDetailText: React.Dispatch<React.SetStateAction<string>>;
  contactPerson: string;
  setContactPerson: React.Dispatch<React.SetStateAction<string>>;
};

const Form: React.VFC<Props> = props => {
  const {
    todos,
    setTodos,
    tit,
    setTit,
    detailText,
    setDetailText,
    contactPerson,
    setContactPerson
  } = props;

  const classes = useStyles();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!tit || !detailText || !contactPerson) {
      return;
    }

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    const newTodo: Omit<TodoType, "value"> = {
      day: `${year}/${month}/${day}`,
      tit: tit,
      id: new Date().getTime(),
      edit: false,
      detailText: detailText,
      contactPerson: contactPerson
    };

    setTodos([newTodo, ...todos]);

    setTit("");
    setDetailText("");
    setContactPerson("");
  };
  return (
    <>
      <form className={classes.root} onSubmit={e => handleSubmit(e)}>
        <Box display="flex" flexWrap="wrap" alignItems="flex-start" mt={1}>
          <TextField
            required
            id="outlined-required"
            label="タイトル"
            placeholder="タイトルを入力してください"
            variant="outlined"
            value={tit}
            onChange={e => {
              setTit(e.target.value);
            }}
          />
        </Box>
        <Box display="flex" flexWrap="wrap" alignItems="flex-start" mt={1}>
          <TextField
            required
            id="outlined-required"
            label="詳細"
            placeholder="詳細を入力してください"
            variant="outlined"
            value={detailText}
            multiline
            rows={4}
            onChange={e => {
              setDetailText(e.target.value);
            }}
          />
        </Box>
        <Box display="flex" flexWrap="wrap" alignItems="flex-start" mt={1}>
          <TextField
            required
            id="outlined-required"
            label="担当者"
            placeholder="担当者を入力してください"
            variant="outlined"
            value={contactPerson}
            onChange={e => {
              setContactPerson(e.target.value);
            }}
          />
        </Box>
        <Box mt={1} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            onSubmit={e => handleSubmit(e)}
            variant="contained"
            color="primary"
          >
            登録
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Form;
