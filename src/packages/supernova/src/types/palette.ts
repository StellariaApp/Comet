import type { CSSTheme } from './css';
import type { EnumColors } from './enums/colors';
import type { EnumComponent } from './enums/components';

export type Components = Partial<EnumComponent> &
  Record<string, CSSTheme | undefined>;

export type Colors = Partial<EnumColors> & {
  [key: string]: string | Colors | undefined;
};

export type Properties = {
  [key: string]:
    | string
    | number
    | undefined
    | Properties
    | Colors
    | Components
    | CSSTheme;
};

export type Palette = {
  colors?: Colors;
  components?: Components;
} & Record<string, Properties>;
