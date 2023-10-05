import { css } from "@stellaria/comet";

const footerStyle = css`
  width: 100%;
  height: 80px;
  background-color: #1b1c1d;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const linkStyle = css`
  color: #fff;
  text-decoration: underline;
  font-size: 0.9rem;
  cursor: pointer;
  color: #5092d7;
`;

const Footer = () => {
  return (
    <footer className={footerStyle}>
      <a className={linkStyle}>@Stellaria</a>
    </footer>
  );
};

export default Footer;
