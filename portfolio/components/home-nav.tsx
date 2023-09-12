type Props = {
    scrollTo: any;
    theme: string;
    section: number;
}

const HomeNav = ({scrollTo, theme, section}: Props) => {
    var textColor, bgColor;

    if(theme == "dark") {
        textColor = 'text-zinc-100';
        bgColor   = bgColorSelect(section);
    } else {
        textColor = textColorSelect(section);
        bgColor   = 'bg-zinc-100'
    }

    function textColorSelect(section: number) {
        switch (section) {
            case 0 : return 'text-green-900';
            case 1 : return 'text-teal-900';
            case 2 : return 'text-indigo-900';
            case 3 : return 'text-purple-900';
            case 4 : return 'text-rose-900';
            default: return 'text-black';
        }
    }

    function bgColorSelect(section: number) {
        switch (section) {
            case 0 : return 'bg-green-900';
            case 1 : return 'bg-teal-900';
            case 2 : return 'bg-indigo-900';
            case 3 : return 'bg-purple-900';
            case 4 : return 'bg-rose-900';
            default: return 'bg-black';
        }
    }

    function headingColorSelect(section: number) {
        switch (section) {
            case 0 : return 'bg-green-600';
            case 1 : return 'bg-teal-600';
            case 2 : return 'bg-indigo-600';
            case 3 : return 'bg-purple-600';
            case 4 : return 'bg-rose-600';
            // case 0 : return 'bg-erazgreen';
            // case 1 : return 'bg-erazyellow';
            // case 2 : return 'bg-erazorange';
            // case 3 : return 'bg-erazred';
            // case 4 : return 'bg-rose-600';
            default: return 'bg-black';
        }
    }

    return (
        <div className={`${headingColorSelect(section)} fixed top-0 inset-x-0 z-50 py-4 md:p-2 flex-row justify-center flex font-bold text-sm md:text-2xl`}>
            <button onClick={() => scrollTo(0)} className="mx-2">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 0? 'h-full' : 'h-2'} ${bgColor} rounded-md duration-[250ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${textColor} text-end`}>
                        Home
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(1)} className="mx-2 ">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 1? 'h-full' : 'h-2'} ${bgColor} rounded-md duration-[250ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${textColor} text-end`}>
                        Expertise
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(2)} className="mx-2 ">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 2? 'h-full' : 'h-2'} ${bgColor} rounded-md duration-[250ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${textColor} text-end`}>
                        Work
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(3)} className="mx-2 ">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${(section == 3)? 'h-full' : 'h-2'} ${bgColor} rounded-md duration-[250ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${textColor} text-end`}>
                        Experience
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(4)} className="mx-2">
                <div className="group relative px-1 pt-2 h-10 md:h-14 w-50 overflow-hidden">
                    <span className={`absolute inset-x-0 bottom-0 w-full ${section == 4? 'h-full' : 'h-2'} ${bgColor} rounded-md duration-[250ms] ease-in-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative ${textColor} text-end`}>
                        Contact
                    </div>
                </div>
            </button>
        </div>
    )
}

export default HomeNav