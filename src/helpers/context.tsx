import { React } from 'uebersicht';

const ThemeContext = React.createContext<string | undefined>(undefined);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = (): string => {
  const theme = React.useContext(ThemeContext);

  if (theme === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return theme;
};
