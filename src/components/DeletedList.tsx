import { TodoType } from "../types/todo";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

type Props = {
  setDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailTodo: React.Dispatch<React.SetStateAction<TodoType[]>>;
  deletedList: TodoType[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",

      "& li": {
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "16px",
        marginTop: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",

        "&:first-child": {
          marginRight: "0"
        },

        "& .show-detail": {
          display: "block",
          textAlign: "right",
          cursor: "pointer",
          textDecoration: "underline"
        }
      }
    }
  })
);

const DeletedList: React.VFC<Props> = props => {
  const { setDetail, setDetailTodo, deletedList } = props;
  const classes = useStyles();

  const changeDetail = (todoIndex: number) => {
    // 詳細画面初期化
    setDetail(false);
    setDetail(true);

    setDetailTodo([deletedList[todoIndex]]);
  };

  return (
    <>
      <p>deletedList</p>
      <List className={classes.root}>
        {deletedList.map((deletedItem, deletedItemIndex) => {
          return (
            <ListItem key={deletedItem.id}>
              <p>{deletedItem.tit}</p>
              <p
                className="show-detail"
                onClick={() => changeDetail(deletedItemIndex)}
              >
                詳細を見る
              </p>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
export default DeletedList;
