'use client';

import { useServerInsertedHTML } from 'next/navigation';
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
    const styles = Array.from(stylesExtract).map((style) => style.innerHTML);
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

  useServerInsertedHTML(() => {
    const { cache } = props;
    return (
      <style
        //  data-emotion="css"
        dangerouslySetInnerHTML={{ __html: cache.join('\n') }}
      />
    );
  });

  return <>{children}</>;
};
