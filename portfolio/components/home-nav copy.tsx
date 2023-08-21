import Link from "next/link"


const HomeNav = () => {
    return (
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
    )
}

export default HomeNav