import Link from "next/link"


const HomeNav = () => {

    const scrollTo = (section: number) => {
        window.scrollTo({
            top: window.innerHeight * section,
            behavior: 'smooth',
        });
    };

    return (
        <div className="flex-row justify-center flex font-bold text-2xl">
                <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-14 w-50 overflow-hidden">
                        <span className="absolute inset-x-12 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(0)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Home
                        </button>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-x-16 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(1)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Expertise
                        </button>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-x-12 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(2)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Work
                        </button>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-x-20 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(3)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Experience
                        </button>
                    </div>
                </div>
                <div className="mx-2">
                    <div className="group relative px-1 pt-2 h-14 w-50 overflow-hidden">
                        <span className="absolute inset-x-14 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(4)} className="relative px-3 text-zinc-100 text-end">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default HomeNav