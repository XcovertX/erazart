import Link from "next/link"


const HomeNav = () => {

    const scrollTo = (section: number) => {
        window.scrollTo({
            top: window.innerHeight * section,
            behavior: 'smooth',
        });
    };

    return (
        <div className="bg-black fixed top-0 inset-x-0 z-50 py-2 flex-row justify-center flex font-bold text-sm md:text-2xl">
                <div className="mx-2">
                    <div className="group relative md:px-1 pt-2 h-14 w-50 overflow-hidden">
                        <span className="absolute inset-x-8 md:inset-x-12 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(0)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Home
                        </button>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-x-10 md:inset-x-16 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(1)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Expertise
                        </button>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-x-8 md:inset-x-12 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(2)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Work
                        </button>
                    </div>
                </div>
                <div className="mx-2 ">
                    <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                        <span className="absolute inset-x-12 md:inset-x-20 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(3)} className="relative px-3 text-zinc-100 text-end group-hover:">
                            Experience
                        </button>
                    </div>
                </div>
                <div className="mx-2">
                    <div className="group relative md:px-1 pt-2 h-14 w-50 overflow-hidden">
                        <span className="absolute inset-x-8 md:inset-x-14 bottom-0 w-2 h-2 bg-green-600 transition-all rounded-sm duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                        <button onClick={() => scrollTo(4)} className="relative px-3 text-zinc-100 text-end">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default HomeNav