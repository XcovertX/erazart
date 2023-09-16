import Image from "next/image"
import { useState } from "react";

type Props = {
    theme: string;
    color: string;
    dmColor: string;
    highlightColor: string;
    dmHighlightColor: string;
}

const SocialLinks = ({ theme, color, dmColor, highlightColor, dmHighlightColor }: Props) => {
    const [gitHover,   setGitHover] =  useState(false);
    const [liHover,     setLIHover] =  useState(false);
    const [instHover, setInstHover] =  useState(false);
    const onMouseEnterGit  = () =>   setGitHover(true);
    const onMouseLeaveGit  = () =>  setGitHover(false);
    const onMouseEnterLI   = () =>    setLIHover(true);
    const onMouseLeaveLI   = () =>   setLIHover(false);
    const onMouseEnterInst = () =>  setInstHover(true);
    const onMouseLeaveInst = () => setInstHover(false);

    function colorSelect(color: string, link: string) {
        if(color == 'white') {
            if(link == 'github')         { return '/assets/github_icon_white.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_white.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_white.png' }
            else                         { return ''                                 }
        } else if(color == 'green') {
            if(link == 'github')         { return '/assets/github_icon_green.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_green.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_green.png' }
            else                         { return ''                                 }
        } else if(color == 'emerald') {
            if(link == 'github')         { return '/assets/github_icon_emerald.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_emerald.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_emerald.png' }
            else                         { return ''                                 }
        } else if(color == 'emeraldbright') {
            if(link == 'github')         { return '/assets/github_icon_emerald_bright.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_emerald_bright.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_emerald_bright.png' }
            else                         { return ''                                 }
        } else if(color == 'orange') {
            if(link == 'github')         { return '/assets/github_icon_orange.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_orange.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_orange.png' }
            else                         { return ''                                 }
        } else if(color == 'red') {
            if(link == 'github')         { return '/assets/github_icon_red.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_red.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_red.png' }
            else                         { return ''                                 }
        } else if(color == 'pink') {
            if(link == 'github')         { return '/assets/github_icon_pink.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_pink.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_pink.png' }
            else                         { return ''                                 }
        } else if(color == 'black') {
            if(link == 'github')         { return '/assets/github_icon_black.png';   } 
            else if(link == 'linkedin')  { return '/assets/linkedin_icon_black.png'; }
            else if(link == 'instagram') { return '/assets/instagram_icon_black.png' }
            else                         { return ''                                 }
        }
    }

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
                        src={theme == "dark"? 
                            (gitHover? colorSelect(dmHighlightColor, 'github') : colorSelect(dmColor, 'github')) 
                            : 
                            (gitHover? colorSelect(highlightColor, 'github')   : colorSelect(color, 'github'))}
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
                        src={theme == "dark"? 
                        (liHover? colorSelect(dmHighlightColor, 'linkedin') : colorSelect(dmColor, 'linkedin')) 
                        : 
                        (liHover? colorSelect(highlightColor, 'linkedin')   : colorSelect(color, 'linkedin'))}
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
                        src={theme == "dark"? 
                        (instHover? colorSelect(dmHighlightColor, 'instagram') : colorSelect(dmColor, 'instagram')) 
                        : 
                        (instHover? colorSelect(highlightColor, 'instagram')   : colorSelect(color, 'instagram'))}
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