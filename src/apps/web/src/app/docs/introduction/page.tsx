'use client';
import { Button, Wrapper, css } from '@stellaria/supernova';

const PageDocs = () => {
  return (
    <Wrapper
      css={() => css`
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <Button>introduction</Button>
    </Wrapper>
  );
};

export default PageDocs;
