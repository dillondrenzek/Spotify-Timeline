import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';
import { theme } from './theme';

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider(props: AppThemeProviderProps) {
  const { children } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
