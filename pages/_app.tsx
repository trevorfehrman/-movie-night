import * as React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
export const ThemeContext = React.createContext('light');

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
