import { useState } from "preact/hooks";

import "./app.css";

import { css } from "@stellaria/comet";

const theme = {
  colors: {
    primary: "red",
    secondary: "blue",
  },
};

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 200px;
  background-color: var(--colors-primary-light);
  color: white;
`;

const styles2 = css`
  --colors-primary-light: blue;
  background-color: var(--colors-primary-light);
  color: white;
  width: 200px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  &:hover {
    background-color: yellow;
  }
`;

const styles3 = css`
  background-color: green;
  color: white;

  &:hover {
    background-color: yellow;
  }
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
