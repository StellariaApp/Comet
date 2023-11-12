import { useEffect } from 'react';

type Props = {
  autoHide?: boolean;
};

const useAutoClose = (props: Props) => {
  const { autoHide } = props;

  const id = crypto.randomUUID();

  useEffect(() => {
    if (!autoHide && id) return;
    const section = document.getElementById(id);
    const details = section?.querySelectorAll('details');
    details?.forEach((detail, index) => {
      detail.addEventListener('toggle', () => {
        if (detail.open) {
          details.forEach((d, i) => {
            if (i !== index) {
              d.removeAttribute('open');
            }
          });
        }
      });
    });
  }, [id]);

  return { id };
};

export default useAutoClose;
