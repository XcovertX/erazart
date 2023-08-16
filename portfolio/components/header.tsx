import Link from 'next/link'

const Header = () => {
  return (
    <div className='mb-5 mt-8 flex flex-row items-center justify-between'>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter hover:text-green-500 leading-tight">
        <Link href="/" className="hover:underline">
          ErazArt
        </Link>
        .
      </h2>
      <Link href={'/projects/'} className="tracking-tight md:tracking-tighter leading-tight hover:underline hover:text-green-500 text-2xl md:text-4xl font-bold">
        CodeProjects
      </Link>
    </div>

  )
}

export default Header
