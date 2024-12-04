import { ScreenProvider } from '../context/ScreenContext';

function MyApp({ Component, pageProps }) {
  return (
    <ScreenProvider>
      <Component {...pageProps} />
    </ScreenProvider>
  );
}

export default MyApp;
