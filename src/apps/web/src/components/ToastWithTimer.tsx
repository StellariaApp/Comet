import { Toast } from '@stellaria/supernova';
import useTimer from '../hooks/useTimer';

const ToastWithTimer = () => {
  const { progress, reset } = useTimer({
    time: 6,
    onCompleted: () => {
      reset();
    }
  });

  return (
    <Toast
      onClick={() => {
        alert('clicked');
      }}
      onClose={() => {
        alert('closed');
      }}
      percentage={progress}
      variant="success"
      icon="check-double"
      title="This is a success alert with timer"
      description="This is a success alert description"
    />
  );
};

export default ToastWithTimer;
