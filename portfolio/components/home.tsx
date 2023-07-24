import Link from 'next/link'
import Background from './generative-background'

const Home = () => {
  return (
    <div className="flex-col flex h-screen text-zinc-100">
        <Background />
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                ErazArt.
            </h1>
        </section>
        <div className="justify-end items-end flex-col grow flex font-bold">
            <h2 className=" text-center pb-20 md:text-left text-2xl mt-5 md:pl-8">
            <Link href="/" className="hover:underline hover:pb-5 hover:px-10 ease-in duration-300 hover:border-emerald-400 hover:border hover:pt-44 hover:text-emerald-400 hover:bg-neutral-800 px-3">
                Interactive Art
            </Link>
            <Link href="/generative-art/" className="hover:underline hover:pb-5 hover:px-10 ease-in duration-300 hover:border-emerald-400 hover:border hover:pt-44 hover:text-emerald-400 hover:bg-neutral-800 px-3">
                Generative Art
            </Link>
            <Link href="/posts/" className="hover:underline hover:pb-5 hover:px-10 ease-in duration-300 hover:border-emerald-400 hover:border hover:pt-44 hover:text-emerald-400 hover:bg-neutral-800 px-3">
                Digital Art
            </Link>
            <Link href="/physical-art/" className="hover:underline hover:pb-5 hover:px-10 ease-in duration-300 hover:border-emerald-400 hover:border hover:pt-44 hover:text-emerald-400 hover:bg-neutral-800 px-3">
                Physical Art
            </Link>
            <Link href="/projects/" className="hover:underline hover:pb-5 hover:px-10 ease-in duration-300 hover:border-emerald-400 hover:border hover:pt-44 hover:text-emerald-400 hover:bg-neutral-800 px-3">
                Project Portfolio
            </Link>
            </h2>
        </div>
    </div>
  )
}

export default Home