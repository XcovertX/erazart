import Link from 'next/link'

const Header = () => {
  return (
    <div className='mb-5 mt-8 flex flex-row items-center justify-between'>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter hover:text-green-500 leading-tight">
        <Link href="/" className="hover:underline">
          Return To Home
        </Link>
        .
      </h2>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter hover:text-green-500 leading-tight">
        <Link href={'/projects/'} className="hover:underline">
          Coding Projects
        </Link>
        .
      </h2>
    </div>

  )
}

export default Header
