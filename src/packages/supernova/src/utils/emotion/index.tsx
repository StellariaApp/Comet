'use client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useMemo } from 'react';

type Props = {
  children: React.ReactNode;
};

export const StyleRegistry = (props: Props) => {
  const { children } = props;
  const cache = useMemo(() => {
    const store = createCache({ key: 'css' });
    store.compat = true;
    return store;
  }, []);

  useServerInsertedHTML(() => {
    return (
      <style
        id="emotion-server-side-styles"
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' ')
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
