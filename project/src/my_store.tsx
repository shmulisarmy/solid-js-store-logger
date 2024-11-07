import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { User_Type } from "./App";
import { a } from "vite/dist/node/types.d-aGj9QkWt";
export type Signal<T> = ReturnType<typeof createSignal<T>>;
const [signalValue, setSignalValue] = createSignal<any>(null);

export type Action = {
  indexers: any[];
  oldState: any;
  newState: any;
};

export class MyStore<T extends object> {
  state: T;
  actions: Signal<Action[]>;
  upto: Signal<number>;
  setUpto: Setter<number>;
  setState: Setter<T>;
  setActions: Setter<Action[]>;

  constructor(initialState: T) {
    [this.state, this.setState] = createStore(initialState);
    [this.actions, this.setActions] = createSignal<Action[]>([]);
    [this.upto, this.setUpto] = createSignal(0);
  }

  dispatch(indexers: any[], newState: any) {
    let oldState: any = this.state;
    for (const indexer of indexers) {
      oldState = oldState[indexer];
    }

    console.log(oldState, " => ", newState);

    const actions_copy = [...this.actions()];
    actions_copy.length = this.upto();

    actions_copy.push({
      indexers,
      oldState,
      newState,
    });

    this.setUpto(prev => prev + 1);

    this.setActions(actions_copy); // Update the actions store

    this.my_state_setter<User_Type[]>(indexers, newState);
  }

  private my_state_setter<T>(
    indexers: any[],
    newState: any
  ) {
    if (indexers.length === 1) {
      this.setState(indexers[0], newState);
    } else if (indexers.length === 2) {
      this.setState(indexers[0], indexers[1], newState);
    } else if (indexers.length === 3) {
      this.setState(indexers[0], indexers[1], indexers[2], newState);
    } else if (indexers.length === 4) {
      this.setState(indexers[0], indexers[1], indexers[2], indexers[3], newState);
    } else if (indexers.length === 5) {
      this.setState(indexers[0], indexers[1], indexers[2], indexers[3], indexers[4], newState);
    }
  }

  undo() {
    if (this.upto() > 0) {
      this.setUpto(prev => prev - 1);
    }

    console.log("Undoing...", { upto: this.upto() });
    const current_action = this.actions()[this.upto()];

    this.my_state_setter(current_action.indexers, current_action.oldState);

    // Trigger store update
    this.setActions([...this.actions()]);
  }

  redo() {
    if (this.upto() < this.actions().length) {
      this.setUpto(prev => prev + 1);
    }

    console.log("Redoing...", { upto: this.upto() });
    const current_action = this.actions()[this.upto() - 1];

    this.my_state_setter(current_action.indexers, current_action.newState);

    this.setActions([...this.actions()]);
  }

}


export function my_store<T extends object>(initialState: T) {
  const store = new MyStore(initialState);

  return [store.state, store.dispatch.bind(store), store.undo.bind(store), store.redo.bind(store), store.actions, store.upto, store];
}