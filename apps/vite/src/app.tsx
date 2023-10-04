import { useState } from "preact/hooks";

import { css, cx, variables } from "@stellaria/comet";

const vars = variables({
  background: "#0072f5",
  text: "#ffffff",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)",
  hoverBackground: "#0062d5",
});

const vars2 = variables({
  border: "#229971",
});

const button = css`
  background-color: ${vars.background};
  width: max-content;
  padding: 0.7rem 1rem;
  border-radius: 0.32rem;
  border: 2px solid ${vars2.border};
  color: ${vars.text};
  box-shadow: ${vars.boxShadow};
  &:hover {
    background-color: ${vars.hoverBackground};
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

const classes = (count: number) => cx([button, count > 5 && error]);

export function App() {
  const [count, setCount] = useState(0);

  const setter = () => setCount((count) => count + 1);

  return (
    <div class={wrapper}>
      <button class={classes(count)} onClick={setter}>
        {count}
      </button>
    </div>
  );
}
