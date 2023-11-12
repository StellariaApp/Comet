import createEmotion from '@emotion/css/create-instance';

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache
} = createEmotion({
  key: 'comet'
});

export * from './cv';
export * from './props';
export * from './theme';
