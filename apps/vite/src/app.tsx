import { useState } from "preact/hooks";

import "./app.css";

import AtomButton from "./components/atom/button";

import { css, variables } from "@stellaria/comet";

const vars = variables({
  colors: {
    backgroundColor: "#2437e2",
    color: "#fff",
    hover: "#4c1bd9",
  },
});

const styles = css`
  border: none;
  text-align: center;
  padding: 12px 30px;
  font-size: 20px;
  line-height: 28px;
  border-radius: 4px;
  background-color: ${vars.colors.backgroundColor};
  color: ${vars.colors.color};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${vars.colors.hover};
  }
`;

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AtomButton />
      <button class={styles} onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
}
