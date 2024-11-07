import type { Component } from 'solid-js';
import { createEffect, createSignal, For, Show } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import { users, setUsers } from './users';
import { createStore } from 'solid-js/store';

type User_Type = {
  name: string,
  email: string,
  id: number
}

type action = {
  indexers: string|number[],
  oldState: any,
  newState: any
}

const [actions, setActions] = createSignal<action[]>([]);
let upto: number = 0;

function dispatch(indexers: string|number[], newState: any) {
  let oldState = users;
  for (const indexer of indexers) {
    oldState = oldState[indexer];
  }

  console.log(oldState, " => ", newState);

  const actions_copy = [...actions()]; // copy actions

  actions_copy.length = upto;


  
  actions_copy.push({
    indexers,
    oldState,
    newState
  });

  upto++;
  
  setActions(actions_copy);

  state_setter(indexers, newState);

  
}


function state_setter(indexers: string|number[], newState: any) {
  if (indexers.length == 1) {
    setUsers(indexers[0], newState);
  } else if(indexers.length == 2) {
    setUsers(indexers[0], indexers[1], newState);
  } else if(indexers.length == 3) {
    setUsers(indexers[0], indexers[1], indexers[2], newState);
  } else if(indexers.length == 4) {
    setUsers(indexers[0], indexers[1], indexers[2], indexers[3], newState);
  } else if(indexers.length == 5) {
    setUsers(indexers[0], indexers[1], indexers[2], indexers[3], indexers[4], newState);
  } else if(indexers.length == 6) {
    setUsers(indexers[0], indexers[1], indexers[2], indexers[3], indexers[4], indexers[5], newState);
  }
}


function undo() {
  if (upto > 0) {
    upto--;
  }

  console.log("Undoing...", {upto});
  const current_action = actions()[upto];

  state_setter(current_action.indexers, current_action.oldState);
  setActions([...actions()])
}


function Field_changer({index, field}: {index: number, field: string}) {
  let input_ref: HTMLInputElement | undefined;
  return (
    <div>
      <label for={field}>{field}</label>
      <br />
      <input ref={input_ref} type="text" />
      <br />
      <button onclick={() => {dispatch([index, field], input_ref!.value)}}>change</button>
    </div>
  );
}


function Action_list() {
  return (
    <div>
      <For each={actions()}>{(action, index) => 
        <div class={`${styles.action} ${index() > upto ? styles.undone : ''}`}>
        <p>{action.oldState} {'=>'} {action.newState}</p>
        </div>}</For>
    </div>
  );
}



function User({ user }: { user: User_Type }) {
  return (
    <div class={styles.user}>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <Field_changer index={users.indexOf(user)} field="name"/>
      <Field_changer index={users.indexOf(user)} field="email"/>
    </div>
  );
}

const App: Component = () => {
  return (
    <div class={styles.App}>
      <button onclick={undo}>Undo</button>
      <Action_list />
      <For each={users}>{user => <User user={user} />}</For>
    </div>
  );
};

export default App;
