type Props = {
    headingColor: string;
    scrollTo: any;
    dark: boolean;
}

const HomeNav = ({headingColor, scrollTo, dark}: Props) => {
    var textColor, bgColor;

    if(dark) {
        textColor = 'text-zinc-100';
        bgColor   = bgColorSelect(headingColor);
    } else {
        textColor = textColorSelect(headingColor);
        bgColor   = 'bg-zinc-100'
    }

    function textColorSelect(color) {
        switch (color) {
            case 'bg-green-600' : return 'text-green-900';
            case 'bg-teal-600'  : return 'text-teal-900';
            case 'bg-indigo-600': return 'text-indigo-900';
            case 'bg-purple-600': return 'text-purple-900';
            case 'bg-rose-600'  : return 'text-rose-900';
            default             : return 'text-black';
        }
    }

    function bgColorSelect(color) {
        switch (color) {
            case 'bg-green-600' : return 'bg-green-900';
            case 'bg-teal-600'  : return 'bg-teal-900';
            case 'bg-indigo-600': return 'bg-indigo-900';
            case 'bg-purple-600': return 'bg-purple-900';
            case 'bg-rose-600'  : return 'bg-rose-900';
            default             : return 'bg-black';
        }
    }

    return (
        <div className={`${headingColor} fixed top-0 inset-x-0 z-50 py-2 flex-row justify-center flex font-bold text-sm md:text-2xl`}>
            <button onClick={() => scrollTo(0)} className="mx-2">
                <div className="group relative md:px-1 pt-2 h-14 w-50 overflow-hidden">
                    <span className={`absolute inset-x-8 md:inset-x-12 bottom-0 w-2 h-2 ${bgColor} rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative px-3 ${textColor} text-end`}>
                        Home
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(1)} className="mx-2 ">
                <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-8 md:inset-x-16 bottom-0 w-2 h-2 ${bgColor} rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative px-3 ${textColor} text-end`}>
                        Expertise
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(2)} className="mx-2 ">
                <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-8 md:inset-x-12 bottom-0 w-2 h-2 ${bgColor} rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative px-3 ${textColor} text-end`}>
                        Work
                    </div>
                </div>
            </button>
            <button onClick={() => scrollTo(5)} className="mx-2 ">
                <div className="group relative md:px-1 pt-2 h-14 w-50 whitespace-nowrap overflow-hidden">
                    <span className={`absolute inset-x-8 md:inset-x-20 bottom-0 w-2 h-2 ${bgColor} rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <div className={`relative px-3 ${textColor} text-end`}>
                        Experience
                    </div>
                </div>
            </button>
            <div className="mx-2">
                <div className="group relative md:px-1 pt-2 h-14 w-50 overflow-hidden">
                    <span className={`absolute inset-x-8 md:inset-x-14 bottom-0 w-2 h-2 ${bgColor} rounded-md duration-[250ms] ease-out group-hover:h-full group-hover:w-full group-hover:inset-x-0`}></span>
                    <button onClick={() => scrollTo(6)} className={`relative px-3 ${textColor} text-end`}>
                        Contact
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeNav