import { useState } from "preact/hooks";

import "./app.css";

import { css } from "@stellaria/comet";

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;
  background-color: red;
  color: white;
`;

const styles2 = css`
  background-color: blue;
  color: white;
`;

const styles3 = css`
  background-color: green;
  color: white;
`;

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button class={styles} onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <span>class hash is {styles}</span>
      <button class={styles2} onClick={() => setCount((count) => count - 1)}>
        count is {count}
      </button>
      <span>class hash is {styles2}</span>
      <button class={styles3} onClick={() => setCount((count) => count - 1)}>
        count is {count}
      </button>
      <span>class hash is {styles3}</span>
    </div>
  );
}
