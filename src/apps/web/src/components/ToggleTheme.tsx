'use client';
import { Button, useTheme } from '@stellaria/comet';

const ToggleTheme = () => {
  const { toggle } = useTheme();
  return (
    <Button
      onClick={() => {
        toggle();
      }}
    >
      ToggleTheme
    </Button>
  );
};

export default ToggleTheme;
