import { TodoType } from "../types/todo";

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

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLInputElement>
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
      <form onSubmit={e => handleSubmit(e)}>
        <div className="input-area">
          <label>タイトル</label>
          <input
            type="text"
            value={tit}
            placeholder="入力してください"
            required
            onChange={e => {
              setTit(e.target.value);
            }}
          />
        </div>
        <div className="input-area">
          <label>詳細</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            value={detailText}
            placeholder="入力してください"
            required
            onChange={e => {
              setDetailText(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="input-area">
          <label>担当者</label>
          <input
            type="text"
            value={contactPerson}
            placeholder="入力してください"
            required
            onChange={e => {
              setContactPerson(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="登録" onSubmit={e => handleSubmit(e)} />
      </form>
    </>
  );
};

export default Form;
