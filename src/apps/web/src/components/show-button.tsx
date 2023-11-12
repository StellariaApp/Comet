'use client';
import { Button, AnimatePresence } from '@stellaria/comet';
import { useState } from 'react';

const ShowButton = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <AnimatePresence>
        <Button
          onClick={() => {
            setShow((prev) => !prev);
          }}
        >
          Get Started
        </Button>
        {show ? <Button key="comet-atom-button">Animations</Button> : null}
      </AnimatePresence>
    </div>
  );
};

export default ShowButton;
