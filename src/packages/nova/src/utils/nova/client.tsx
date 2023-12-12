'use client';
import { useEffect, useState } from 'react';
import { cache as cacheCSS } from '../css';
import { generateHash } from '../hash';
import CONFIG from '../../config';
import type { PropsCacheServer, Style } from './cache';

type Props = {
  props: PropsCacheServer;
  style: Style | null;
};

const UpdateCache = async (props: Props, style: string) => {
  const { props: propsCacheServer } = props;
  const { style_id, api_key } = propsCacheServer;
  if (!style_id || !api_key) return null;

  const res = await fetch(CONFIG?.GET_URL(`/style/${style_id}`), {
    method: 'PUT',
    body: JSON.stringify({ style }),
    headers: {
      'X-Api-Key': api_key
    },
    cache: 'no-cache'
  });
  const styles = (await res.json()) as Style;

  return styles;
};

const NovaClient = (props: Props) => {
  const { props: propsCacheServer, style } = props;
  const { style_id, api_key } = propsCacheServer;
  if (!style_id || !api_key) return null;

  const [cache, setCache] = useState<string | null>(style?.style ?? null);

  useEffect(() => {
    const Update = async () => {
      const styleElement = document.getElementById(style?.id ?? '');
      if (!styleElement) return;

      const tags = cacheCSS.sheet.tags;
      const styles = tags.map((tag) => tag.innerHTML).join('');
      const hash = generateHash(styles);
      const cacheHash = generateHash(cache ?? '');
      const isEqual = hash === cacheHash;
      setCache(styles);
      if (isEqual) return;

      const newStyle = await UpdateCache(props, styles);
      if (!newStyle) return;

      styleElement.innerHTML = newStyle.style;
    };

    Update().catch(() => null);
  }, []);

  return null;
};

export default NovaClient;
