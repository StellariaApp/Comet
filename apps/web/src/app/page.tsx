import { css } from "@stellaria/comet";

const wrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const button = css`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
`;

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
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

function App() {
  return (
    <div className={wrapper}>
      <span>class hash is {button}</span>
      <button className={[button, styles].join(" ")}>Button Styles</button>
      <span>class hash is {styles}</span>
      <button className={[button, styles2].join(" ")}>Button Styles 2</button>
      <span>class hash is {styles2}</span>
      <button className={[button, styles3].join(" ")}>Button Styles 3</button>
      <span>class hash is {styles3}</span>
    </div>
  );
}

export default App;
