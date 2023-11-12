import GlobalStyles from '../../styles/globalStyles';
import type { Theme } from '../../types/theme';
import { SetupThemeScript } from './scripts';
import type { IConfig } from './theme';
import { SetupTheme } from './theme';

export const SetupSuperNova = <T extends Theme>(props: IConfig<T>) => {
  const { default: def, themes, children } = props;
  return (
    <>
      <SetupTheme default={def} themes={themes} />
      <SetupThemeScript default={def?.toString() ?? ''} />
      {children}
      <GlobalStyles />
    </>
  );
};

export default SetupSuperNova;
