import { css } from "@stellaria/comet";

const buttonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 300px;
  background-color: blue;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const AtomButton = () => {
  return (
    <button className={buttonStyles}>AtomButton Hash is {buttonStyles}</button>
  );
};

export default AtomButton;
