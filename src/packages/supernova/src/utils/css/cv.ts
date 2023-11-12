import { cx } from '@emotion/css';
import type { CSSTheme, Palette } from '../../types';

type IVartsKeys<T> = {
  [key in keyof T]:
    | (IVartsKeys<T[key]> & {
        default?: keyof Omit<T[key], 'default'>;
      })
    | CSSTheme
    | string;
};

type IVarts<T> = IVartsKeys<T> & {
  base?: string | CSSTheme;
};

type IVart<T> = {
  [key in keyof Omit<T, 'default' | 'base'>]?:
    | boolean
    | IVart<T[key]>
    | keyof T[key];
};

export const cv =
  <T extends object>(variants: IVarts<T>) =>
  (variant: IVart<T>, theme?: Palette) => {
    const { base, ...objVart } = variants;

    const getStyle = (
      styles: Record<string, string | object | CSSTheme>,
      actions: Record<string, unknown>,
      def?: string
    ) => {
      const entries = Object.entries(styles);

      const classes = entries.reduce(
        (acc, [key, value]) => {
          const valueWithDefault = value as Record<string, string>;
          const action =
            typeof actions === 'object'
              ? actions[key] ?? valueWithDefault.default
              : actions;

          const isUndefined = typeof action === 'undefined';
          if (isUndefined) return acc;

          const isObject = typeof value === 'object';
          if (isObject) {
            const stylesObject = getStyle(
              value as Record<string, string>,
              action as Record<string, unknown>
            ) as string[];

            return [...acc, ...stylesObject];
          }

          const isString = typeof action === 'string';
          if (isString) {
            const classString = styles[action];

            const isKey = key === action && classString !== def;
            if (!isKey) return acc;

            const isClassFunction = typeof classString === 'function';
            if (isClassFunction) {
              const classFunction = classString as CSSTheme;
              const classStringResult = classFunction(theme, variant);
              return [...acc, classStringResult];
            }

            const isClassString = typeof classString === 'string';
            if (!isClassString) return acc;

            return [...acc, classString];
          }

          const isBoolean = typeof action === 'boolean';
          if (isBoolean) {
            const baseClasses =
              typeof value === 'function'
                ? (value(theme, variant) as string)
                : value;
            return [...acc, baseClasses];
          }

          return acc;
        },
        def ? [def] : []
      );

      return classes;
    };

    const baseClasses =
      typeof base === 'function' ? base(theme, variant) : base;
    const styles = getStyle(objVart, variant, baseClasses);

    return cx(styles);
  };
