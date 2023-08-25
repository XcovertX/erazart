import Link from 'next/link'
import Background from '../pattern-gen-core/generative-background'
import SocialLinks from './social'
import HomeNav from './home-nav'
import HomeTitle from './home-title'
import ScrollButton from './scroll-button'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Expertise from './home-expertise'

const Home = () => {
    const [scrollYPosition, setScrollYPosition] = useState(0);
    const [w, setW] = useState(0);
    const [headingColor, setHeadingColor] = useState('bg-green-600');

    const getHeadingColor = (section: number) => {
        switch(section) {
            case  0: return 'bg-green-600';
            case  1: return 'bg-sky-600';
            case  2: return 'bg-indigo-700';
            case  3: return 'bg-fuchsia-600';
            default: return 'bg-red-500';
        }
    }

    const scrollTo = (section: number) => {
        window.scrollTo({
            top: window.innerHeight * section,
            behavior: 'smooth',
        });
    };

    useEffect(() => {

        function getSection() {
            return Math.floor((window.scrollY+100)/window.innerHeight);
        }

        function updateYScrollPos() {
            setScrollYPosition(window.scrollY);
            setHeadingColor(getHeadingColor(getSection()));
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

        <div className="fixed right-5 bottom-0 z-50">
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
                        <SocialLinks dark={false}/>
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
                <Expertise width={w} dark={false}/>
            </div>
            
        </div>
    </>
  )
}

export default Home