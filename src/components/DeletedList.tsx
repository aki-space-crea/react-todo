import { TodoType } from "../types/todo";

type Props = {
  setDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailTodo: React.Dispatch<React.SetStateAction<TodoType[]>>;
  deletedList: TodoType[];
};

const DeletedList: React.VFC<Props> = props => {
  const { setDetail, setDetailTodo, deletedList } = props;

  const changeDetail = (todoIndex: number) => {
    // 詳細画面初期化
    setDetail(false);
    setDetail(true);

    setDetailTodo([deletedList[todoIndex]]);
  };

  return (
    <>
      <p>deletedList</p>
      <ul>
        {deletedList.map((deletedItem, deletedItemIndex) => {
          return (
            <li
              key={deletedItem.id}
              onClick={() => changeDetail(deletedItemIndex)}
            >
              {deletedItem.tit}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default DeletedList;
