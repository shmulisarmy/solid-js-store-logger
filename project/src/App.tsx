import type { Component } from "solid-js";
import { createEffect, For, Show } from "solid-js";
import type { Setter } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
// import { users, setUsers } from "./users";
import { dispatch, actions, upto, users, undo, redo, user_store_class } from "./dispatch";
import {Action_list} from "./my_store_extension";

export type User_Type = {
  name: string;
  email: string;
  id: number;
};





function Field_changer({ index, field }: { index: number; field: string }) {
  let input_ref: HTMLInputElement | undefined;
  return (
    <div>
      <label for={field}>{field}</label>
      <br />
      <input ref={input_ref} type="text" />
      <br />
      <button
        onclick={() => {
          dispatch([index, field], input_ref!.value);
        }}
      >
        change
      </button>
    </div>
  );
}



function User({ user }: { user: User_Type }) {
  return (
    <div class={styles.user}>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <Field_changer index={users.indexOf(user)} field="name" />
      <Field_changer index={users.indexOf(user)} field="email" />
    </div>
  );
}

const App: Component = () => {
  return (
    <div class={styles.App}>
      <button onclick={undo}>Undo</button>
      <button onclick={redo}>Redo</button>
      <Action_list store_class={user_store_class} />
      <For each={users}>{(user) => <User user={user} />}</For>
    </div>
  );
};

export default App;
