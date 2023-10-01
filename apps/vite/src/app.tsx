import { useState } from "preact/hooks";

import { css, variables } from "@stellaria/comet";

const vars = variables({
  button: {
    background: "#0072f5",
    text: "#ffffff",
    boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)",
    hoverBackground: "#0062d5",
  },
});

const button = css`
  --local-background: ${vars.button.background};
  background-color: var(--local-background);
  width: max-content;
  padding: 0.7rem 1rem;
  border-radius: 0.32rem;
  border: 1px solid #225a99;
  color: ${vars.button.text};
  box-shadow: ${vars.button.boxShadow};
  &:hover {
    background-color: ${vars.button.hoverBackground};
    transform: scale(1.12);
  }
  &:active {
    transform: scale(0.98);
  }

  transition: all 0.2s ease-in-out;
`;

const error = css`
  background-color: #e71f33;
  border-color: #a51220;
  &:hover {
    background-color: #d61d30;
    border-color: #8f0f1c;
  }
`;

const wrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const classes = (count: number) => `${button} ${count > 2 ? error : ""}`;

export function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const setter = () => setCount((count) => count + 1);
  const setter2 = () => setCount2((count2) => count2 + 1);

  return (
    <div class={wrapper}>
      <button class={button}>Without Error</button>
      <button class={classes(count)} onClick={setter}>
        {count}
      </button>
      <button class={classes(count2)} onClick={setter2}>
        {count2}
      </button>
    </div>
  );
}
