import Link from "next/link"
import { useState } from "react";
import { Toggle } from "./toggle";


const HomeNav = (props: {headingColor: string, scrollTo}) => {

    return (
        <div className={`${props.headingColor} fixed top-0 inset-x-0 z-50 py-2 flex-row justify-center flex font-bold text-sm md:text-2xl`}>
            <button onClick={() => props.scrollTo(0)} className="mx-2">
                <div className="group relative md:px-1 pt-2 h-14 w-50 overflow-hidden">
                    <span className="absolute inset-x-8 md:inset-x-12 bottom-0 w-2 h-2 bg-black rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                    <div className="relative px-3 text-zinc-100 text-end ">
                        Home
                    </div>
                </div>
            </button>
            <button onClick={() => props.scrollTo(1)} className="mx-2 ">
                <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className="absolute inset-x-10 md:inset-x-16 bottom-0 w-2 h-2 bg-black transition-all rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                    <div className="relative px-3 text-zinc-100 text-end group-hover:">
                        Expertise
                    </div>
                </div>
            </button>
            <button onClick={() => props.scrollTo(2)} className="mx-2 ">
                <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className="absolute inset-x-8 md:inset-x-12 bottom-0 w-2 h-2 bg-black transition-all rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                    <div className="relative px-3 text-zinc-100 text-end group-hover:">
                        Work
                    </div>
                </div>
            </button>
            <button onClick={() => props.scrollTo(5)} className="mx-2 ">
                <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className="absolute inset-x-12 md:inset-x-20 bottom-0 w-2 h-2 bg-black transition-all rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                    <div className="relative px-3 text-zinc-100 text-end group-hover:">
                        Experience
                    </div>
                </div>
            </button>
            <div className="mx-2">
                <div className="group relative md:px-1 pt-2 h-14 w-50 overflow-hidden">
                    <span className="absolute inset-x-8 md:inset-x-14 bottom-0 w-2 h-2 bg-black transition-all rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0"></span>
                    <button onClick={() => props.scrollTo(6)} className="relative px-3 text-zinc-100 text-end">
                        Contact
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeNav