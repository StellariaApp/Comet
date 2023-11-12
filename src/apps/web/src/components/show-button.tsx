'use client';
import { Button, AnimatePresence } from '@stellaria/supernova';
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
        {show ? <Button key="supernova-atom-button">Animations</Button> : null}
      </AnimatePresence>
    </div>
  );
};

export default ShowButton;
