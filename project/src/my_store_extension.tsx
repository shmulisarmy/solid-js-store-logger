import type { Component } from "solid-js";
import { createEffect, For, Show } from "solid-js";
import type { Setter } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
// import { users, setUsers } from "./users";

export function Action_list({store_class}: {store_class: any}) {
    return (
      <div>
        {store_class.actions().map((action, index) => (
          <div class={`${styles.action} ${index >= store_class.upto() ? styles.undone : ""}`}>
            <p>
              {action.oldState} {" => "} {action.newState}
            </p>
          </div>
        ))}
      </div>
    );
  }