import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SwrProvider } from '../components/SwrProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SwrProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SwrProvider>
  );
}
