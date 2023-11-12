import { Icon } from '../Icon';
import { ToastContainer } from './components/container';
import { ToastTitle } from './components/title';
import { ToastIcon } from './components/icon';
import { ToastButton } from './components/button';
import { ToastDescription } from './components/description';
import type { ToastProps } from './types';

const Toast = (props: ToastProps) => {
  const { title, description, icon, components, percentage, onClick, onClose } =
    props;
  return (
    <ToastContainer
      percentage={percentage}
      onClick={onClick}
      {...components?.container}
    >
      <ToastIcon icon={icon} {...components?.icon} />
      <ToastTitle {...components?.title}>{title}</ToastTitle>
      <ToastDescription {...components?.description}>
        {description}
      </ToastDescription>
      <ToastButton onClick={onClose} {...components?.button} />
    </ToastContainer>
  );
};

Toast.Container = ToastContainer;
Toast.Icon = Icon;
Toast.Title = ToastTitle;
Toast.Description = ToastDescription;
Toast.Button = ToastButton;

export { Toast };

export type * from './types';
