import { TodoType } from "../types/todo";

type Props = {
  deletedList: TodoType[];
};

const DeletedList: React.VFC<Props> = props => {
  const { deletedList } = props;

  return (
    <>
      <p>deletedList</p>
      <ul>
        {deletedList.map(deletedItem => {
          return <li key={deletedItem.id}>{deletedItem.value}</li>;
        })}
      </ul>
    </>
  );
};
export default DeletedList;
