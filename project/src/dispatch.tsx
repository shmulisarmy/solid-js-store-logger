import { User_Type } from "./App";
// import { users, setUsers } from "./users";
import { my_store } from "./my_store";

export const [users, dispatch, undo, redo, actions, upto] = my_store<User_Type[]>([
  {
    id: 1,
    name: 'John Doe',
    email: 'Hb5nH@example.com',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: '8Bk7M@example.com',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'Hb5nH@example.com',
  },
  {
    id: 4,
    name: 'Jane Doe',
    email: '8Bk7M@example.com',
  },
  {
    id: 5,
    name: 'John Doe',
    email: 'Hb5nH@example.com',
  },
  {
    id: 6,
    name: 'Jane Doe',
    email: '8Bk7M@example.com',
  },
]);
