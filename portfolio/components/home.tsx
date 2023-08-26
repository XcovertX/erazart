import Link from 'next/link'
import Background from '../pattern-gen-core/generative-background'
import SocialLinks from './social'
import HomeNav from './home-nav'
import HomeTitle from './home-title'
import ScrollButton from './scroll-button'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Expertise from './home-expertise'
import MyWork from './home-my-work'
import { Toggle } from './toggle'
import Index from '../pages/projects'

const Home = () => {
    const [scrollYPosition, setScrollYPosition] = useState(0);
    const [w, setW] = useState(0);
    const [headingColor, setHeadingColor] = useState('bg-green-600');
    const [currentSection, setCurrentSection] = useState(0);
    const [darkMode, setDarkMode] = useState(true);

    const getHeadingColor = (section: number) => {
        switch(section) {
            case  0: return 'bg-green-600';
            case  1: return 'bg-teal-600';
            case  2: return 'bg-blue-600';
            case  3: return 'bg-violet-600';
            default: return 'bg-rose-600';
        }
    }

    const scrollTo = (section: number) => {
        window.scrollTo({
            top: window.innerHeight * section,
            behavior: 'smooth',
        });
    };

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {

        function getSection() {
            return Math.floor((window.scrollY+100)/window.innerHeight);
        }

        function updateYScrollPos() {
            setScrollYPosition(window.scrollY);
            const s = getSection();
            setCurrentSection(s);
            setHeadingColor(getHeadingColor(s));
        }

        function updateW() {
            setW(window.innerWidth)
        }

        window.addEventListener('scroll', updateYScrollPos);
        updateYScrollPos();
        window.addEventListener('resize', updateW);
        updateW();

        return () => {
            window.removeEventListener('scroll', updateYScrollPos)
            window.removeEventListener('resize', updateW);
        };
    }, []);

  return (
    <>  
        <Background />

        <div className="fixed right-5 bottom-0 z-36">
            {
                scrollYPosition > 500?
                <ScrollButton top={0} direction={true} scrollTo={scrollTo}/>
                :
                <></>
            }
        </div>

        
        <div className="">
            <div className="flex-col h-screen items-center justify-between flex text-zinc-100">
                <div className="items-center flex flex-col pt-5">
                    <div className="py-10">
                        <HomeNav headingColor={headingColor} scrollTo={scrollTo}/>
                    </div>
                    <div className="pt-10">
                        <SocialLinks dark={darkMode}/>
                    </div>
                </div>
                <div className=" pt-6">
                    <HomeTitle />
                </div>
                <div className="pb-10">
                    <ScrollButton top={1} direction={false} scrollTo={scrollTo}/>
                </div>
            </div>
            <div  className="flex-col h-screen items-center justify-between flex text-zinc-100">
                <Expertise width={w} dark={darkMode}/>
            </div> 
            <div  className="flex-col h-screen items-center justify-between flex text-zinc-100">
                <Index />
            </div>   
        </div>
        <div className="fixed right-5 top-5 z-50">
            <div className="flex flex-row">
                <h3 className="pt-1 pr-3">{darkMode? 'DARK MODE' : 'LIGHT MODE'}</h3>
                <Toggle title={'light/dark mode'} color={headingColor} onChange={handleDarkMode} currentState={darkMode} />
            </div>
        </div>
    </>
  )
}

export default Home