import Link from 'next/link'
import Background from '../pattern-gen-core/generative-background'
import SocialLinks from './social'

const Home = () => {
  return (
    <div className="flex-col flex h-screen text-zinc-100">
        <Background />
        <div className="flex justify-center">
            <section className="flex-col flex items-center justify-between mt-16 mb-16 md:mb-12">
                <SocialLinks dark={false}/>
                <div className="flex-col flex justify-center md:pt-36 pt-6">
                    <h1 className="pl-1 text-center text-5xl lg:text-9xl md:text-7xl font-bold tracking-tighter leading-tight">
                        JAMES COVERT
                    </h1>
                    <div className="text-center hidden md:block text-xl lg:text-3xl font-bold tracking-tighter leading-tight">
                        SOFTWARE ENGINEER \\ FULL STACK \\ WEB DEV
                    </div>
                    <h3 className="text-center md:hidden text-lg font-bold tracking-tighter leading-tight">
                        SE \\ WD \\ GAE
                    </h3>
                </div>
            </section>
        </div>

        <div className="lg:justify-end md:p-5 justify-center p-5 mb-5 grow items-end flex flex-row">
            <div className="flex-row flex font-bold text-2xl">
            <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-12 w-50 overflow-hidden">
                        <span className="absolute inset-0 w-2 bg-orange-500 transition-all rounded-sm duration-[250ms] ease-out group-hover:w-full"></span>
                        <Link href="/posts/" className="relative px-3 text-zinc-100 text-end group-hover:">
                            Art
                        </Link>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative px-1 pt-2 h-12 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-0 w-2 bg-fuchsia-700 transition-all rounded-sm duration-[250ms] ease-out group-hover:w-full"></span>
                        <Link href="/projects/" className="relative px-3 text-zinc-100 text-end group-hover:">
                            Coding Portfolio
                        </Link>
                    </div>
                </div>
                <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-12 w-50 overflow-hidden">
                        <span className="absolute inset-0 w-2 bg-fuchsia-700 transition-all rounded-sm duration-[250ms] ease-out group-hover:w-full"></span>
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