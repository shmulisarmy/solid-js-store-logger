import type { Component } from "solid-js";
import { createEffect, For, Show, ErrorBoundary, createSelector,  } from "solid-js";
import type { Setter } from "solid-js";
import {createMutable, createStore, unwrap } from "solid-js/store";

import logo from "./logo.svg";
import styles from "./App.module.css";
// import { users, setUsers } from "./users";
import { setUsers,  users, user_store_class } from "./dispatch";
import { Action_logger } from "./action_logger/extension_pack";
import { Form } from "./reusable_components/Form";

export type User_Type = {
  name: string;
  email: string;
  id: number;
};


const main_person = createMutable<{data: User_Type}>({
  data: {
  name: "shmuli",
  email: "shmulikeller@example.com",
  id: 1
}})





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
          setUsers(index, field, input_ref!.value);
        }}
      >
        change
      </button>
    </div>
  );
}

function ErrorC() {
  throw new Error("you have run out memory and can therefor not render this component");
  return (
    <div>hello</div>
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
}XPathEvaluator

const App: Component = () => {
  return (
    <>
    <ErrorBoundary fallback={(error) => <div style={{ color: "red", border: "1px solid orange", padding: "4px" }}>error: {error.message}</div>}>
      <ErrorC/>
    </ErrorBoundary>
    <div class="main-person">
      <p>{main_person.data.name}</p>
      <p>{main_person.data.email}</p>
      <Form store={main_person.data}>
        <button onClick={(e) => {e.preventDefault(); alert(main_person.data.name)}}>brodcast</button>
      </Form>
    </div>

    <div class={styles.App}>
      
      <Action_logger store_class={user_store_class} />
      <For each={users}>{(user) => <User user={user} />}</For>
    </div>
    </>
  );
};

export default App;
