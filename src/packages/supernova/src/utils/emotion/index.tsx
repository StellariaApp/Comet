'use client';

import { useEffect } from 'react';

type Props = {
  cache: string[];
  children: React.ReactNode;
};

export const StyleRegistry = (props: Props) => {
  const { children } = props;

  useEffect(() => {
    const stylesExtract = document.querySelectorAll(
      'style[data-emotion="css"]'
    );
    const styles = Array.from(stylesExtract).map((style) => style.outerHTML);
    const fetchStyles = async () => {
      const res = await fetch('/api/styles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ styles })
      });
      const data = await res.json();
      return data as string[];
    };
    fetchStyles().catch(() => null);
  }, []);

  return <>{children}</>;
};
