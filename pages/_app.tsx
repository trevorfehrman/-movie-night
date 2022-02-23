import * as React from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Nav } from '../components/Nav';
export const ThemeContext = React.createContext('light');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Nav>
      <Component {...pageProps} />
    </Nav>
  );
}

export default MyApp;
