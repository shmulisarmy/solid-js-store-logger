import { createSignal } from "solid-js";
import styles from "./styles.module.css";
import type { JSX } from "solid-js/jsx-runtime";


export default function Tabs({ children, options, style }: { children: ({}: any) => JSX.Element, options: any, style?: any }) {
    const [selectedTab, setSelectedTab] = createSignal<string>(
      Object.keys(options)[0]
    );

    function set_selected(selector: HTMLElement) {
      const previously_selected = document.querySelector(`.${styles.selected}`);
      if (previously_selected) {
        previously_selected.classList.remove(styles.selected);
      }
      selector.classList.add(styles.selected);

    }
  
    return (
      <div id={styles.tabs} style={style}>
        {Object.keys(options).map((key) => (
          <button class={styles.selector} onClick={() => {setSelectedTab(key); set_selected(this)}}>{key}</button>
        ))}
        <div class={styles.tab_content}>{children(options[selectedTab()])}</div>
      </div>
    );
  }