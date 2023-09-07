import { AppProps } from 'next/app'
import '../styles/index.css'
import ThemeProvider from '../context/context';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider>
      <Component {...pageProps}/>
    </ThemeProvider>
  )
}
