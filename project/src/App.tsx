import type { Component } from "solid-js";
import { For, Show, ErrorBoundary, createSelector, createSignal,  } from "solid-js";
import type { Setter } from "solid-js";
import {createMutable, createStore, unwrap } from "solid-js/store";
import Letter_animator from "./reusable_components/letter_animator";
import {JSX} from "solid-js/jsx-runtime";
import logo from "./logo.svg";
import styles from "./App.module.css";
// import { users, setUsers } from "./users";
import { setUsers,  users, user_store_class } from "./user_data";
import { Action_logger } from "./action_logger/extension_pack";
import { Form } from "./reusable_components/Form";
import { useState, React_component, useEffect } from "./useState";
import Tabs  from "./reusable_components/tabs";
import Table from "./reusable_components/table";
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


const items = {
  "Item 1": { id: 1, name: "Item 1", price: 10.99, quantity: 5 },
  "Item 2": { id: 2, name: "Item 2", price: 5.99, quantity: 2 },
  "Item 3": { id: 3, name: "Item 3", price: 7.99, quantity: 8 },
}

// function Item(item : any)  {
//   return (
    
//   );
// }


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

function Counter({name, email} : any) {

  const [count, setCount] = useState(0);
  const [othercount, setOtherCount] = useState(10);


  useEffect(() => {
    console.log("count is now: ", count);
  }, [count]);





  console.log("name: ", name, "email: ", email);
  
  return (
    <>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <button onClick={() => {setCount(count + 1)}}>Count: {count}</button>
      <button onClick={() => {setOtherCount(prev => prev + 1)}}>other: {othercount}</button>
    </>
  );
}


const App: Component = () => {
  return (
    <>
      <Tabs options={items}>
        {(item) => (
          <>
          <div style={{display: "flex", "justify-content": "space-around"}}>

          <div>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
         <div>
           <h2>{item.name}</h2>
           <p>Price: ${item.price}</p>
           <p>Quantity: {item.quantity}</p>
         </div>
         <div>
           <h2>{item.name}</h2>
           <p>Price: ${item.price}</p>
           <p>Quantity: {item.quantity}</p>
         </div>
         <div>
           <h2>{item.name}</h2>
           <p>Price: ${item.price}</p>
           <p>Quantity: {item.quantity}</p>
         </div>
          </div>
          </>

        )}
      </Tabs>
      <React_component
        component={Counter}
        args={{ name: "shmuli", email: "shmulikeller@example.com" }}
      />
      <React_component component={Counter} args={{}} />
      <Letter_animator
        Class={styles.letter_animator}
        letters="wellcome back to solid, this is a test"
        speed={80}
      />
      <div class="main-person">
        <p>{main_person.data.name}</p>
        <p>{main_person.data.email}</p>
        <Form Class={styles.custom_form} data={main_person.data}>
          <button
            onClick={(e) => {
              e.preventDefault();
              alert(main_person.data.name);
            }}
          >
            brodcast
          </button>
        </Form>
      </div>

      <div class={styles.App}>
        <Action_logger store_class={user_store_class} />
        <For each={users}>{(user) => <User user={user} />}</For>
      </div>
      <Table store={users} setter={setUsers}></Table>
    </>
  );
};

export default App;
