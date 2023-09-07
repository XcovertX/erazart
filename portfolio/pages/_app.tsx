import { AppProps } from 'next/app'
import '../styles/index.css'
import DarkModeToggle from '../components/dark-mode'
import { useEffect, useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
  return (
    <>
      {/* <DarkModeToggle headingColor={'bg-green-600'} darkMode={darkMode} handleDarkMode={handleDarkMode}/> */}
      <Component {...pageProps} darkMode={darkMode} handleDarkMode={handleDarkMode} />
    </>
    
  )
}
