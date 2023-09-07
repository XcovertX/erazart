import { useContext } from 'react'
import Footer from './footer'
import Meta from './meta'
import { ThemeContext } from '../context/context'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <Meta />
      <div className={`min-h-screen ${theme == 'dark'? 'bg-black' : ''}`}>
        <main>{children}</main>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
