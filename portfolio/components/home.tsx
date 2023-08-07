import Link from 'next/link'
import Background from '../pattern-gen-core/generative-background'
import SocialLinks from './social'

const Home = () => {
  return (
    <div className="flex-col flex h-screen text-zinc-100">
        <Background />
        <section className="flex-col md:flex-row flex items-center md:items-start md:justify-between mt-16 mb-16 md:mb-12">
            <div className="flex-col">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                    ErazArt.
                </h1>
            </div>

            <SocialLinks dark={false}/>
        </section>
        <div className="justify-end p-20 mb-5 grow items-end flex flex-row">
            <div className="flex-row flex font-bold text-2xl">
            <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-12 w-50 overflow-hidden">
                        <span className="absolute inset-0 w-2 bg-emerald-400 transition-all rounded-sm duration-[250ms] ease-out group-hover:w-full"></span>
                        <Link href="/posts/" className="relative px-3 text-zinc-100 text-end group-hover:">
                            Art
                        </Link>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative px-1 pt-2 h-12 w-50 overflow-hidden">
                        <span className="absolute inset-0 w-2 bg-emerald-400 transition-all rounded-sm duration-[250ms] ease-out group-hover:w-full"></span>
                        <Link href="/projects/" className="relative px-3 text-zinc-100 text-end group-hover:">
                        Coding Portfolio
                        </Link>
                    </div>
                </div>
                <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-12 w-50 overflow-hidden">
                        <span className="absolute inset-0 w-2 bg-emerald-400 transition-all rounded-sm duration-[250ms] ease-out group-hover:w-full"></span>
                        <Link href="/about/" className="relative px-3 text-zinc-100 text-end group-hover:">
                            About
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Home