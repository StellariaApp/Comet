import { useState } from "preact/hooks";

import "./app.css";

import { css } from "@stellaria/comet";

const styles = css`
  background-color: red;
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
    </div>
  );
}
