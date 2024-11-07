import { For } from "solid-js";

export function Form({ store, children }: { store: { [key: string | number | symbol]: any; }, children?: any }) {
  if (!(store instanceof Object) || store instanceof Array) {
    throw new Error("store is not an object");
  }
  return (
    <form>
      <For each={Object.keys(store)}>
        {(field) => {
          let input_ref: HTMLInputElement | undefined;
          return (
            <>
              <label for={field}>{field}: </label>
              <input ref={input_ref} oninput={() => store[field] = input_ref!.value} type="text" />
              <br />
            </>
          );
        }}
      </For>
      {children}
    </form>
  );
}
