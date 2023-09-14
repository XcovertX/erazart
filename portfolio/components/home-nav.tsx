type Props = {
    scrollTo: any;
    theme: string;
    section: number;
}

const HomeNav = ({scrollTo, theme, section}: Props) => {
    var textColor, selectedTextColor, bgColor, selectedBGColor, headingColor;

    if(theme == "dark") {
        headingColor      = 'bg-emerald-500';
        textColor         = 'text-zinc-100';
        selectedTextColor = 'text-zinc-100'
        bgColor           = 'bg-amber-500';
        selectedBGColor   = 'bg-amber-400';
    } else {
        headingColor      = 'bg-emerald-500';
        textColor         = 'text-emerald-700';
        selectedTextColor = 'text-zinc-100'
        bgColor           = 'bg-amber-500';
        selectedBGColor   = 'bg-amber-400';
    }

    return (
        <div className={`${headingColor} fixed top-0 inset-x-0 z-50 py-4 md:p-2 flex-row justify-center flex font-bold text-sm md:text-2xl`}>
            <button onClick={() => scrollTo(0)} className="mx-2">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 0? 'h-full' : 'h-2'} ${section == 0? selectedBGColor : bgColor} rounded-md duration-[150ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${section == 0? selectedTextColor : textColor} group-hover:text-zinc-100 text-end`}>
                        Home
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(1)} className="mx-2 ">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 1? 'h-full' : 'h-2'} ${section == 1? selectedBGColor : bgColor} rounded-md duration-[150ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${section == 1? selectedTextColor : textColor} group-hover:text-zinc-100 text-end`}>
                        Expertise
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(2)} className="mx-2 ">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 2? 'h-full' : 'h-2'} ${section == 2? selectedBGColor : bgColor} rounded-md duration-[150ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${section == 2? selectedTextColor : textColor} group-hover:text-zinc-100 text-end`}>
                        Work
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(3)} className="mx-2 ">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${(section == 3)? 'h-full' : 'h-2'} ${section == 3? selectedBGColor : bgColor} rounded-md duration-[150ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${section == 3? selectedTextColor : textColor} group-hover:text-zinc-100 text-end`}>
                        Experience
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(4)} className="mx-2">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 4? 'h-full' : 'h-2'} ${section == 4? selectedBGColor : bgColor} rounded-md duration-[150ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${section == 4? selectedTextColor : textColor} group-hover:text-zinc-100 text-end`}>
                        Contact
                    </div>
                </div>
            </button>
        </div>
    )
}

export default HomeNav