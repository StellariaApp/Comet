'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cache as cacheCSS } from '../css';

type Props = {
  cache?: string;
  children: React.ReactNode;
};

export const StyleRegistry = (props: Props) => {
  const { children } = props;

  const [stylesG, setStylesG] = useState<string>('');

  useEffect(() => {
    const tags = cacheCSS.sheet.tags;
    const styles = tags.map((tag) => tag.innerHTML).join('\n');
    setStylesG(styles);

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
    if (!cache) return null;
    return (
      <style
        data-emotion="comet-cache"
        dangerouslySetInnerHTML={{
          __html: cache
        }}
      />
    );
  });

  return (
    <>
      {children}
      <span>{stylesG}</span>
    </>
  );
};
