import Link from 'next/link'
import { useContext } from 'react'
import { ThemeContext } from '../context/context'

const Header = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme == 'dark'? 'text-emerald-500' : 'text-emerald-950'} mb-5 mt-8 flex flex-row items-center justify-between`}>
      <h2 className={`${theme == 'dark'? 'hover:text-red-500' : 'hover:text-amber-500'} text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight`}>
        <Link href="/" className="hover:underline">
          Return To Home
        </Link>
        .
      </h2>
      <h2 className={`${theme == 'dark'? 'hover:text-red-500' : 'hover:text-amber-500'} text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight`}>
        <Link href={'/projects/'} className="hover:underline">
          Coding Projects
        </Link>
        .
      </h2>
    </div>

  )
}

export default Header
