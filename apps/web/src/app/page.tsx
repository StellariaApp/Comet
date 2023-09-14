import { css } from "@stellaria/comet";

const styles = css`
  color: red;
  background-color: blue;
  width: 100%;
  height: 100%;
  display: flex;
`;

export default function Page() {
  return (
    <>
      <h1>Commet Web</h1>
      <h1 className={styles}>
        Hello World
        <br />
        {styles}
      </h1>
    </>
  );
}
