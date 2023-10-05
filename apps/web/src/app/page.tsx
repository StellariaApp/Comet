import { css, variables } from "@stellaria/comet";

const vars = variables({
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

const button = css`
  background-color: ${vars?.button?.base?.background};
  width: max-content;
  padding: 0.7rem 1rem;
  border-radius: 0.32rem;
  border: 2px solid ${vars?.button?.base?.border};
  color: ${vars?.button?.base?.text};
  box-shadow: ${vars?.button?.base?.boxShadow};
  &:hover {
    background-color: ${vars?.button?.base?.hoverBackground};
    transform: scale(1.12);
  }
  &:active {
    transform: scale(0.98);
  }

  transition: all 0.2s ease-in-out;
`;

const App = () => {
  return (
    <div className={wrapper}>
      <div className={content}>
        <button className={button}>Server Side Button hash:{button}</button>
      </div>
    </div>
  );
};

export default App;
