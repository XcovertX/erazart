import Image from "next/image"

type Props = {
    dark: boolean
}

const SocialLinks = ({dark}: Props) => {
  return (
    <div className="flex flex-row sm:mt-5">
        <div className="md:mx-10 mx-5">
            <div className="flex items-center relative justify-center">
                <a href="http://github.com/xcovertx" 
                target="_blank"
                className="absolute md:w-10 md:h-10 w-5 h-5 rounded-full mr-4 md:hover:w-14 md:hover:h-14 hover:w-8 hover:h-8 hover:bg-emerald-400 ease-in duration-[250ms]">
                    <Image 
                        src={dark? '/assets/github_icon_black.png' : '/assets/github_icon_white.png'}
                        className="" 
                        alt={'github'} 
                        width={100} 
                        height={100}/>
                </a>
            </div>
        </div>

        <div className="md:mx-10 mx-5">
            <div className="flex items-center relative justify-center">
                <a href="https://linkedin.com/in/xerazx/" 
                target="_blank"
                className="absolute md:w-11 md:h-11 w-5 h-5 rounded-full mr-4 md:hover:w-14 md:hover:h-14 hover:w-8 hover:h-8 hover:bg-emerald-400 ease-in duration-[250ms]">
                    <Image 
                        src={dark? '/assets/linkedin_icon_black.png' : '/assets/linkedin_icon_white.png'}
                        className=""
                        alt={'linkedin'} 
                        width={100} 
                        height={100}/>
                </a>
            </div>
        </div>

        <div className="md:mx-10 mx-5">
            <div className="flex items-center relative justify-center">
                <a href="https://instagram.com/eraz_art/" 
                target="_blank"
                className="absolute md:w-10 md:h-10 w-5 h-5 rounded-full mr-4 md:hover:w-14 md:hover:h-14 hover:w-8 hover:h-8 hover:bg-emerald-400 ease-in duration-[250ms]">  
                    <Image 
                        src={dark? '/assets/instagram_icon_black.png' : '/assets/instagram_icon_white.png'}
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