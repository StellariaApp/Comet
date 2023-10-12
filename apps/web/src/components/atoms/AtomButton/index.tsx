import { css } from "@stellaria/comet";
import { vars } from "../../../theme/vars";

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

const AtomButton = () => {
  return <button className={button}>Server Side Button {button}</button>;
};

export default AtomButton;
