import Image from "next/image"
import { useEffect, useState } from "react"
import { SoftwareDevChart } from "./charts";


const Expertise = (props: {width: number, dark: boolean}) => {
const [selected, setSelected] = useState(0);

const handleSelect = (n: number) => {
    setSelected(n);
}

// tailwind css
const buttonSelected     = "bg-indigo-500 w-full px-1 m-1 border-4 flex flex-col grow justify-between border-green-600 bg-green-600/[.06]";
const buttonNotSelected  = "p-3 m-1 border-4 flex flex-col justify-center border-red-600 bg-red-600/[.06]";
const headingSelected    = "text-xl font-bold";
const headingNotSelected = "text-2xl font-bold break-normal rotate-180 mb-5";
const descriptionHolder  = "flex flex-col grow justify-between bg-red-300" ;
const description        = "";
const chartHolder        = "bg-blue-500 w-full relative grow";

// icon assets
const reactWhite        = '/assets/react_icon_white.png';
const reactBlack        = '/assets/react_icon_black.png';
const reactGreen        = '/assets/react_icon_green.png';
const nodeWhite         = '/assets/node_icon_white.png';
const nodeBlack         = '/assets/node_icon_black.png';
const nodeGreen         = '/assets/node_icon_green.png';
const sofDevWhite       = '/assets/softwaredev_icon_white.png';
const sofDevBlack       = '/assets/softwaredev_icon_black.png';
const sofDevGreen       = '/assets/softwaredev_icon_green.png';
const emDevWhite        = '/assets/embedded_icon_white.png';
const emDevBlack        = '/assets/embedded_icon_black.png';
const emDevGreen        = '/assets/embedded_icon_green.png';
const clojureWhite      = '/assets/clojure_icon_white.png';
const clojureBlack      = '/assets/clojure_icon_black.png';

    return(
        <div className="bg-green-900 w-full flex-col h-screen items-center justify-start flex text-zinc-100">
                <h1 className="pt-16 text-center text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                    My Expertise
                </h1>
                <div className="w-full flex grow flex-row my-6">
                    <button className={selected == 0? buttonSelected : buttonNotSelected}
                            onClick={() => handleSelect(0)}>
                        <div className="bg-blue-700 flex grow flex-col items-center justify-between w-full">
                            
                            <Image
                                src={selected == 0? sofDevGreen : (props.dark? sofDevBlack : sofDevWhite)}
                                className="my-2" 
                                alt={'softwaredev'} 
                                width ={selected != 0? 50 : (props.width < 1024? 75 : 100)} 
                                height={selected != 0? 50 : (props.width < 1024? 75 : 100)}/>
                            
                            
                            <h2 className={selected == 0? headingSelected : headingNotSelected}
                                style={selected != 0? {writingMode: 'vertical-rl'}: {}}>
                                Software Development
                            </h2>
                            <div className={selected == 0? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                    Well versed in both 
                                    OOP and Functional programming.
                                </h3>
                            </div>
                            <div className={selected == 0? chartHolder : "hidden w-0" }>
                                <SoftwareDevChart />
                            </div>
                        </div>
                    </button>
                    <button className={selected == 1? buttonSelected : buttonNotSelected}
                            onClick={() => handleSelect(1)}>
                        <div className="flex grow flex-col items-center justify-between">
                            <Image
                                src={selected == 1? reactGreen : (props.dark? reactBlack : reactWhite)}
                                className="my-5" 
                                alt={'reactjs'} 
                                width ={selected != 1? 50 : (props.width < 1024? 75 : 100)} 
                                height={selected != 1? 50 : (props.width < 1024? 75 : 100)}/>
                            <h2 className={selected == 1? headingSelected : headingNotSelected}
                                style={selected != 1? {writingMode: 'vertical-rl'}: {}}>
                                Frontend Development
                            </h2>
                            <div className={selected == 1? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                    Over 3 years of development experience in HTML, CSS, JS, React, and NextJS frameworks.
                                </h3>
                            </div>
                        </div>
                    </button>
                    <button className={selected == 2? buttonSelected : buttonNotSelected}
                            onClick={() => handleSelect(2)}>
                        <div className="flex grow flex-col items-center justify-between">
                            <Image
                                src={selected == 2? nodeGreen : (props.dark? nodeBlack : nodeWhite)}
                                className="my-5"
                                alt={'nodejs'} 
                                width ={selected != 2? 50 : (props.width < 1024? 75 : 100)} 
                                height={selected != 2? 50 : (props.width < 1024? 75 : 100)}/>
                            <h2 className={selected == 2? headingSelected : headingNotSelected}
                                style={selected != 2? {writingMode: 'vertical-rl'}: {}}>
                                Backend Development
                            </h2>
                            <div className={selected == 2? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                    Over 3 years of development experience in HTML, CSS, JS, React, and NextJS frameworks.
                                </h3>
                            </div>
                        </div>
                    </button>
                    <button className={selected == 3? buttonSelected : buttonNotSelected}
                            onClick={() => handleSelect(3)}>
                        <div className="flex grow flex-col items-center justify-between">
                            <Image
                                src={selected == 3? emDevGreen : (props.dark? emDevBlack : emDevWhite)}
                                className="my-5" 
                                alt={'embeddeddev'} 
                                width ={selected != 3? 50 : (props.width < 1024? 75 : 100)} 
                                height={selected != 3? 50 : (props.width < 1024? 75 : 100)}/>
                            <h2 className={selected == 3? headingSelected : headingNotSelected}
                                style={selected != 3? {writingMode: 'vertical-rl'}: {}}>
                                Embedded Development
                            </h2>
                            <div className={selected == 3? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                    Over 3 years of development experience in HTML, CSS, JS, React, and NextJS frameworks.
                                </h3>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
    )
}

export default Expertise