import { css } from "@stellaria/comet";
import AtomButton from "./components/atom/button";

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

const App = () => {
  return (
    <div className={wrapper}>
      <div className={content}>
        <AtomButton />
      </div>
    </div>
  );
};

export default App;
