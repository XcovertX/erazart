import Link from 'next/link'
import Background from '../pattern-gen-core/generative-background'
import SocialLinks from './social'

const Home = () => {
  return (
    <>  
    <Background />
        <div className="flex-col items-center justify-between flex h-screen text-zinc-100 py-16">
            <div className="">
                <SocialLinks dark={false}/>
            </div>
            <div className="flex-col flex justify-center md:pb-6 pb-48">
                <h1 className=" text-center text-5xl lg:text-9xl md:text-7xl font-bold tracking-tighter leading-tight">
                    JAMES COVERT
                </h1>
                <div className="text-green-500 text-center hidden md:block text-xl lg:text-3xl font-bold tracking-tighter leading-tight">
                    SOFTWARE ENGINEER \\ FULL STACK \\ WEB DEV
                </div>
                <h3 className="text-green-500 text-center md:hidden text-lg font-bold tracking-tighter leading-tight">
                    SE \\ FS \\ WD
                </h3>
            </div>
            <div className="flex-row justify-center flex font-bold text-2xl">
                <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-14 w-50 overflow-hidden">
                        <span className="absolute inset-x-8 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <Link href="/posts/" className="relative px-3 text-zinc-100 text-end group-hover:">
                            Art
                        </Link>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-x-28 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <Link href="/projects/" className="relative px-3 text-zinc-100 text-end group-hover:">
                            Coding Portfolio
                        </Link>
                    </div>
                </div>
                <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-14 w-50 overflow-hidden">
                        <span className="absolute inset-x-12 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <Link href="/about/" className="relative px-3 text-zinc-100 text-end">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home