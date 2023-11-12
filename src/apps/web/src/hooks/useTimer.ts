import { useEffect, useMemo, useState } from 'react';

type Props = {
  time: number;
  ms?: number;
  onCompleted?: () => void;
};

const useTimer = (props: Props) => {
  const { time = 0, ms = 1000, onCompleted } = props;
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((tm) => {
        if (tm <= 0) {
          onCompleted?.();
          return 0;
        }
        return tm - 1;
      });
    }, ms);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const progress = useMemo(() => (timer / time) * 100, [timer, time]);

  const reset = () => {
    setTimer(time);
  };

  return {
    timer,
    setTimer,
    progress,
    reset
  };
};

export default useTimer;
