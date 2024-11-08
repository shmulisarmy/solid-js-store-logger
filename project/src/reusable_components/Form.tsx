import { For } from "solid-js";

export function Form({ data, children, Class }: { data: { [key: string | number | symbol]: any; }, children?: any, Class?: string }) {
  /**
   * meant to be used with createMutable but also works with regular objects
   */
  if (!(data instanceof Object) || data instanceof Array) {
    throw new Error("data is not an object");
  }
  return (
    <form class={Class}>
      <For each={Object.keys(data)}>
        {(field) => {
          let input_ref: HTMLInputElement | undefined;
          return (
            <>
              <label for={field}>{field}: </label>
              <input ref={input_ref} oninput={() => data[field] = input_ref!.value} type="text" />
              <br />
            </>
          );
        }}
      </For>
      {children}
    </form>
  );
}
