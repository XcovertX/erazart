import Image from "next/image"
import { useState } from "react";

type Props = {
    darkMode: boolean;
    section: number;
}

const SocialLinks = ({darkMode, section}: Props) => {
    const [gitHover,   setGitHover] =  useState(false);
    const [liHover,     setLIHover] =  useState(false);
    const [instHover, setInstHover] =  useState(false);
    const onMouseEnterGit  = () =>   setGitHover(true);
    const onMouseLeaveGit  = () =>  setGitHover(false);
    const onMouseEnterLI   = () =>    setLIHover(true);
    const onMouseLeaveLI   = () =>   setLIHover(false);
    const onMouseEnterInst = () =>  setInstHover(true);
    const onMouseLeaveInst = () => setInstHover(false);

  return (
    <div className="flex flex-row p-5 justify-center items-center">
        <div className="md:mx-10 mx-8">
            <div className="flex items-center relative justify-center"
                onMouseEnter={onMouseEnterGit}
                onMouseLeave={onMouseLeaveGit}>
                <a href="http://github.com/xcovertx" 
                target="_blank"
                className="absolute md:w-10 md:h-10 w-8 h-8 rounded-full md:hover:w-16 md:hover:h-16 hover:w-12 hover:h-12 ease-in-out duration-[250ms]">
                    <Image 
                        src={gitHover? '/assets/github_icon_pink.png' : (!darkMode? (section == 0? '/assets/github_icon_green.png' : '/assets/github_icon_white.png')  : '/assets/github_icon_white.png')}
                        className="" 
                        alt={'github'} 
                        width={100} 
                        height={100}/>
                </a>
            </div>
        </div>

        <div className="md:mx-10 mx-8">
            <div className="flex items-center relative justify-center"
                 onMouseEnter={onMouseEnterLI}
                 onMouseLeave={onMouseLeaveLI}>
                <a href="https://linkedin.com/in/xerazx/" 
                target="_blank"
                className="absolute md:w-10 md:h-10 w-8 h-8 rounded-full md:hover:w-16 md:hover:h-16 hover:w-12 hover:h-12 ease-in-out duration-[250ms]">
                    <Image 
                        src={liHover? '/assets/linkedin_icon_pink.png' : (!darkMode? (section == 0? '/assets/linkedin_icon_green.png' : '/assets/linkedin_icon_white.png')  : '/assets/linkedin_icon_white.png')}
                        className=""
                        alt={'linkedin'} 
                        width={100} 
                        height={100}/>
                </a>
            </div>
        </div>

        <div className="md:mx-10 mx-8">
            <div className="flex items-center relative justify-center"
                 onMouseEnter={onMouseEnterInst}
                 onMouseLeave={onMouseLeaveInst}>
                <a href="https://instagram.com/eraz_art/" 
                target="_blank"
                className="absolute md:w-10 md:h-10 w-8 h-8 rounded-full md:hover:w-16 md:hover:h-16 hover:w-12 hover:h-12 ease-in-out duration-[250ms]">  
                    <Image 
                        src={instHover? '/assets/instagram_icon_pink.png' : (!darkMode? (section == 0? '/assets/instagram_icon_green.png' : '/assets/instagram_icon_white.png')  : '/assets/instagram_icon_white.png')}
                        className=""
                        alt={'instagram'} 
                        width={100} 
                        height={100}/>
                </a>
            </div>
        </div>

    </div>

  )
}

export default SocialLinks