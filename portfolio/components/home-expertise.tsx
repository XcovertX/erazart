import Image from "next/image"
import { useEffect, useState } from "react"


const Expertise = (props: {width: number}) => {
const [selected, setSelected] = useState(0);

const handleSelect = (n: number) => {
    setSelected(n);
}


    return(
        <div className="flex-col h-screen items-center justify-start flex text-zinc-100">
                <h1 className="pt-20 md:pt-24 text-center text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                    My Expertise
                </h1>
                <div className="flex flex-row my-6">
                    <button className="p-3 m-1 border-4 flex justify-center border-red-500"
                            onClick={() => handleSelect(0)}>
                        <div className="flex flex-col items-center justify-start">
                            <Image
                                src={'/assets/react.png'}
                                className="" 
                                alt={'frontend dev'} 
                                width={(props.width < 1024 || selected != 0)? 50 : 100} 
                                height={(props.width < 1024 || selected != 0)? 50 : 100}/>
                            <h2 className={selected == 0? "lg:block hidden text-xl font-bold" : "hidden"}>Frontend Development</h2>
                            <div className={selected == 0? "flex flex-row mx-5 mt-3" : "hidden"}>
                                <h3 className="lg:block hidden whitespace-normal break-words">
                                    Over 3 years of development experience in HTML, CSS, JS, React, and NextJS frameworks.
                                </h3>
                            </div>
                        </div>
                    </button>
                    <button className="p-3 m-1 border-4 flex justify-center border-red-500"
                            onClick={() => handleSelect(1)}>
                        <div className="flex flex-col items-center justify-start">
                            <Image
                                src={'/assets/react.png'}
                                className="" 
                                alt={'frontend dev'} 
                                width={(props.width < 1024 || selected != 1)? 50 : 100} 
                                height={(props.width < 1024 || selected != 1)? 50 : 100}/>
                            <h2 className={selected == 1? "lg:block hidden text-xl font-bold" : "hidden"}>Frontend Development</h2>
                            <div className={selected == 1? "flex flex-row mx-5 mt-3" : "hidden"}>
                                <h3 className="lg:block hidden whitespace-normal break-words">
                                    Over 3 years of development experience in HTML, CSS, JS, React, and NextJS frameworks.
                                </h3>
                            </div>
                        </div>
                    </button>
                    <button className="p-3 m-1 border-4 flex justify-center border-red-500"
                            onClick={() => handleSelect(2)}>
                        <div className=" flex flex-col items-center justify-start">
                            <Image
                                src={'/assets/react.png'}
                                className="" 
                                alt={'frontend dev'} 
                                width={(props.width < 1024 || selected != 2)? 50 : 100} 
                                height={(props.width < 1024 || selected != 2)? 50 : 100}/>
                            <h2 className={selected == 2? "lg:block hidden text-xl font-bold" : "hidden"}>Frontend Development</h2>
                            <div className={selected == 2? "flex flex-row mx-5 mt-3" : "hidden"}>
                                <h3 className="lg:block hidden whitespace-normal break-words">
                                    Over 3 years of development experience in HTML, CSS, JS, React, and NextJS frameworks.
                                </h3>
                            </div>
                        </div>
                    </button>
                    <button className="p-3 m-1 border-4 flex justify-center border-red-500 "
                            onClick={() => handleSelect(3)}>
                        <div className=" flex flex-col items-center justify-start">
                            <Image
                                src={'/assets/react.png'}
                                className="" 
                                alt={'frontend dev'} 
                                width={(props.width < 1024 || selected != 3)? 50 : 100} 
                                height={(props.width < 1024 || selected != 3)? 50 : 100}/>
                            <h2 className={selected == 3? "lg:block hidden text-xl font-bold" : "hidden"}>Frontend Development</h2>
                            <div className={selected == 3? "flex flex-row mx-5 mt-3" : "hidden"}>
                                <h3 className="lg:block hidden whitespace-normal break-words">
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