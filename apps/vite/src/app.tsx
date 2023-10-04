import { useState } from "preact/hooks";

import { css, cv, variables } from "@stellaria/comet";

const varsButton = variables({
  button: {
    base: {
      background: "#0072f5",
      hoverBackground: "#0062d5",
      border: "#0062d5",
      text: "#ffffff",
      boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)",
    },
    success: {
      background: "#00d1b2",
      hoverBackground: "#00c4a7",
      border: "#00c4a7",
      text: "#ffffff",
    },
    error: {
      background: "#e71f33",
      hoverBackground: "#d61d30",
      border: "#a51220",
      text: "#ffffff",
    },
  },
});

const variants = cv({
  base: css`
    background-color: ${varsButton?.button?.base?.background};
    width: max-content;
    padding: 0.7rem 1rem;
    border-radius: 0.32rem;
    border: 2px solid ${varsButton?.button?.base?.border};
    color: ${varsButton?.button?.base?.text};
    box-shadow: ${varsButton?.button?.base?.boxShadow};
    &:hover {
      background-color: ${varsButton?.button?.base?.hoverBackground};
      transform: scale(1.12);
    }
    &:active {
      transform: scale(0.98);
    }

    transition: all 0.2s ease-in-out;
  `,
  success: css`
    border: 2px solid ${varsButton?.button?.success?.border};
    background-color: ${varsButton?.button?.success?.background};
    border-color: ${varsButton?.button?.success?.border};
    &:hover {
      background-color: ${varsButton?.button?.success?.hoverBackground};
    }
  `,
  error: css`
    border: 2px solid ${varsButton?.button?.error?.border};
    background-color: ${varsButton?.button?.error?.background};
    border-color: ${varsButton?.button?.error?.border};
    &:hover {
      background-color: ${varsButton?.button?.error?.hoverBackground};
    }
  `,
});

const variantsButton = (count: number) =>
  variants({
    success: count <= 5,
    error: count > 10,
  });

const wrapper = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const content = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export function App() {
  const [count, setCount] = useState(0);

  const add = () => setCount((count) => count + 1);
  const remove = () => setCount((count) => count - 1);
  const reset = () => setCount(0);
  const clasess = variantsButton(count);

  return (
    <div class={wrapper}>
      <div class={content}>
        <button class={clasess} onClick={remove}>
          -
        </button>
        <button class={clasess} onClick={reset}>
          {count}
        </button>
        <button class={clasess} onClick={add}>
          +
        </button>
      </div>
      <button class={clasess} onClick={reset}>
        Reset
      </button>
    </div>
  );
}
