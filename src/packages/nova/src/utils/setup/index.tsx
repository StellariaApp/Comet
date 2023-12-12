import GlobalStyles from '../../styles/globalStyles';
import type { Theme } from '../../types/theme';
import { SetupThemeScript } from './scripts';
import type { IConfig } from './theme';
import { SetupTheme } from './theme';

export const SetupComet = <T extends Theme>(props: IConfig<T>) => {
  const { default: def, themes } = props;
  return (
    <>
      <SetupTheme default={def} themes={themes} />
      <SetupThemeScript default={def?.toString() ?? ''} />
      <GlobalStyles />
    </>
  );
};

export default SetupComet;
