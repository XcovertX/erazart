import Image from "next/image"
import { useState } from "react"
import { SoftwareDevChart } from "./expertise-sofdev-chart";
import { FrontendChart } from "./expertise-frontend-chart";
import { BackendChart } from "./expertise-backend-chart";
import { EmbedDevChart } from "./expertise-embed-chart";

type Props = {
    width: number;
    theme: string;
}

const Expertise = ({ width, theme }: Props) => {
const [selected, setSelected] = useState(0);
const handleSelect = (n: number) => {
    setSelected(n);
}

// tailwind css
const buttonSelected     = `w-full border-0 rounded-md p-5 m-1 flex flex-row grow justify-between ${theme == "dark"? 'from-emerald-500/[.7] bg-gradient-to-b' : 'bg-gradient-to-b text-emerald-100 from-emerald-500/[.9] to-emerald-500/[.5] from-20%'}`;
const buttonNotSelected  = `w-min border-0 rounded-md p-3 m-1 flex flex-col justify-center ${theme == "dark"? 'bg-gradient-to-b from-red-800 hover:from-red-600 text-emerald-500' : 'bg-gradient-to-b from-orange-600/[.95] to-orange-500/[.9] from-20% hover:from-amber-600/[.95] hover:to-amber-600/[.9] text-emerald-800'} `;
const headingSelected    = `text-4xl font-bold ${theme == "dark"? 'text-emerald-950' : 'text-orange-950'}`;
const headingNotSelected = `text-2xl border-0 font-bold break-normal rotate-180 mb-5 px-1 md:px-5`;
const descriptionHolder  = "flex flex-col grow justify-between p-5" ;
const description        = `text-xl ${theme == 'dark'? 'text-emerald-100' : 'text-orange-700'}`;
const chartHolder        = "h-full relative grow";

// icon assets
const reactWhite        = '/assets/react_icon_white.png';
const reactTeal         = '/assets/react_icon_teal.png';
const reactBlack        = '/assets/react_icon_black.png';
const reactGreen        = '/assets/react_icon_green.png';
const nodeWhite         = '/assets/node_icon_white.png';
const nodeTeal          = '/assets/node_icon_teal.png';
const nodeBlack         = '/assets/node_icon_black.png';
const nodeGreen         = '/assets/node_icon_green.png';
const sofDevWhite       = '/assets/softwaredev_icon_white.png';
const sofDevTeal        = '/assets/softwaredev_icon_teal.png';
const sofDevBlack       = '/assets/softwaredev_icon_black.png';
const sofDevGreen       = '/assets/softwaredev_icon_green.png';
const emDevWhite        = '/assets/embedded_icon_white.png';
const emDevTeal         = '/assets/embedded_icon_teal.png';
const emDevBlack        = '/assets/embedded_icon_black.png';
const emDevGreen        = '/assets/embedded_icon_green.png';
const clojureWhite      = '/assets/clojure_icon_white.png';
const clojureBlack      = '/assets/clojure_icon_black.png';


    return(
        <div className="w-full flex-col h-screen items-center justify-start flex text-zinc-100 transition-all delay-1000">
                <h1 className={`${theme == "dark"? 'text-emerald-100' : 'text-orange-500'} pt-20 text-center text-5xl md:text-7xl font-bold tracking-tighter leading-tight`}>
                    My Expertise
                </h1>
                <div className="w-full flex grow flex-row my-6">
                    <button className={`transition-colors duration-500 ${selected == 0? buttonSelected : buttonNotSelected}`}
                            onClick={() => handleSelect(0)}>
                        <div className="flex grow flex-col items-center h-full justify-between w-full">
                            <Image
                                src={theme == 'dark'? sofDevTeal : sofDevWhite}
                                className={"my-5"}
                                alt={'softwaredev'} 
                                width ={selected == 0? 150 : 50} 
                                height={selected == 0? 150 : 50}/>
                            <h2 className={selected == 0? headingSelected : headingNotSelected}
                                style={selected != 0? {writingMode: 'vertical-rl'}: {}}>
                                Software Development
                            </h2>
                            <div className={selected == 0? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                    Well versed in a wide array of programming languages as well as designing in both 
                                    OOP and Functional paradigms.
                                </h3>
                            </div>

                        </div>
                        <div className={(selected == 0 && width >= 1024)? chartHolder: 'hidden'}>
                            <SoftwareDevChart hidden={(selected == 0 && width >= 1024)? false : true}/>
                        </div>    
                    </button>
                    <button className={`transition-colors duration-500 ${selected == 1? buttonSelected : buttonNotSelected}`}
                            onClick={() => handleSelect(1)}>
                        
                        <div className="flex grow flex-col items-center h-full justify-between w-full">
                            <Image
                                src={theme == 'dark'? reactTeal : reactWhite}
                                className={"my-5"}
                                alt={'softwaredev'} 
                                width ={selected == 1? 150 : 50} 
                                height={selected == 1? 150 : 50}/>
                            <h2 className={selected == 1? headingSelected : headingNotSelected}
                                style={selected != 1? {writingMode: 'vertical-rl'}: {}}>
                                Front End Development
                            </h2>
                            <div className={selected == 1? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                Over 3 years of development experience in HTML, CSS, JavaScript, TypeScript, React, and NextJS frameworks.
                                </h3>
                            </div>

                        </div>
                        <div className={(selected == 1 && width >= 1024)? chartHolder: 'hidden'}>
                            <FrontendChart hidden={(selected == 1 && width >= 1024)? false : true}/>
                        </div>
                    </button>
                    <button className={`transition-colors duration-500 ${selected == 2? buttonSelected : buttonNotSelected}`}
                            onClick={() => handleSelect(2)}>
                        <div className="flex grow flex-col items-center h-full justify-between w-full">
                            <Image
                                src={theme == 'dark'? nodeTeal : nodeWhite}
                                className={"my-5"}
                                alt={'nodejs'} 
                                width ={selected == 2? 150 : 50} 
                                height={selected == 2? 150 : 50}/>
                            <h2 className={selected == 2? headingSelected : headingNotSelected}
                                style={selected != 2? {writingMode: 'vertical-rl'}: {}}>
                                Back End Development
                            </h2>
                            <div className={selected == 2? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                    Sound understanding of server-side development. Proficient with ExpressJS and Spring frameworks and a familiarity with Django.
                                </h3>
                            </div>
                        </div>
                        <div className={(selected == 2 && width >= 1024)? chartHolder: 'hidden'}>
                            <BackendChart hidden={(selected == 2 && width >= 1024)? false : true}/>
                        </div>
                    </button>
                    <button className={`transition-colors duration-500 ${selected == 3? buttonSelected : buttonNotSelected}`}
                            onClick={() => handleSelect(3)}>
                        <div className="flex grow flex-col items-center h-full justify-between w-full  ">
                            <Image
                                src={theme == 'dark'? emDevTeal : emDevWhite}
                                className={"my-5"} 
                                alt={'embeddeddev'} 
                                width ={selected == 3? 150 : 50} 
                                height={selected == 3? 150 : 50}/>
                            <h2 className={selected == 3? headingSelected : headingNotSelected}
                                style={selected != 3? {writingMode: 'vertical-rl'}: {}}>
                                Embedded Development
                            </h2>
                            <div className={selected == 3? descriptionHolder : "hidden"}>
                                <h3 className={description}>
                                    Skilled in designing and developing programs for microcontrollers and embedded systems. 
                                </h3>
                            </div>
                        </div>
                        <div className={(selected == 3 && width >= 1024)? chartHolder: 'hidden'}>
                            <EmbedDevChart hidden={(selected == 3 && width >= 1024)? false : true}/>
                        </div>
                    </button>
                </div>
            </div>
    )
}

export default Expertise