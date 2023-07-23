import Link from 'next/link'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        ErazArt.
      </h1>
      <div >
        <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <Link href="/" className="hover:underline px-3">
            Interactive Art
          </Link>
          <Link href="/" className="hover:underline px-3">
            Generative Art
          </Link>
          <Link href="/" className="hover:underline px-3">
            Digital Art
          </Link>
          <Link href="/" className="hover:underline px-3">
            Physical Art
          </Link>
          <Link href="/" className="hover:underline px-3">
            Project Portfolio
          </Link>
        </h2>
      </div>
    </section>
  )
}

export default Intro