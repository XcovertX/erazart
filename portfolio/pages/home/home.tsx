import Link from 'next/link'
import Background from '../../pattern-gen-core/generative-background'
import SocialLinks from '../../components/social'
import HomeNav from '../../components/home-nav'
import HomeTitle from '../../components/home-title'
import ScrollButton from '../../components/scroll-button'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Expertise from '../../components/home-expertise'
import MyWork from '../../components/home-my-work'
import { Toggle } from '../../components/toggle'
import Layout from '../../components/layout'
import Container from '../../components/container'
import Intro from '../../components/intro'
import MoreStories from '../../components/more-stories'
import { getAllPosts } from '../../lib/api'
import Post from '../../interfaces/post'
import HeroPost from '../../components/hero-post'
import DarkModeToggle from '../../components/dark-mode'
import Experience from '../../components/home-experience'

type Props = {
    allPosts: Post[]
}

const Home = ({ allPosts }: Props) => {
    const [scrollYPosition, setScrollYPosition] = useState(0);
    const [w, setW] = useState(0);
    const [headingColor, setHeadingColor] = useState('bg-green-600');
    const [currentSection, setCurrentSection] = useState(0);
    const [darkMode, setDarkMode] = useState(true);
    
    const getHeadingColor = (section: number) => {
        switch(section) {
            case  0: return 'bg-green-600';
            case  1: return 'bg-teal-600';
            case  2: return 'bg-indigo-600';
            case  3: return 'bg-indigo-600';
            case  4: return 'bg-indigo-600';
            case  5: return 'bg-purple-600';
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
        <Background dark={darkMode}/>
        <div className="fixed right-5 bottom-0 z-36">
            {
                scrollYPosition > 500?
                <ScrollButton top={0} direction={true} scrollTo={scrollTo} darkMode={darkMode} color={headingColor}/>
                :
                <></>
            }
        </div>
        <div className="flex flex-col">
            <div className="flex-col h-screen items-center justify-between flex text-zinc-100">
                <div className="items-center flex flex-col pt-5">
                    <div className="py-10">
                        <HomeNav headingColor={headingColor} scrollTo={scrollTo} dark={darkMode}/>
                    </div>
                    <div className="pt-10">
                        <SocialLinks dark={darkMode}/>
                    </div>
                </div>
                <div className=" pt-6">
                    <HomeTitle dark={darkMode}/>
                </div>
                <div className="pb-10">
                    <ScrollButton top={1} direction={false} scrollTo={scrollTo} darkMode={darkMode} color={headingColor}/>
                </div>
            </div>
            <div  className="flex-col h-screen items-center justify-center flex text-zinc-100">
                <Expertise width={w} dark={darkMode}/>
            </div> 
            

            <div  className="flex-col items-center justify-center flex text-zinc-100">
                <MyWork allPosts={allPosts} darkMode={darkMode}/>
            </div>            
            <div  className="h-screen items-start justify-center flex text-zinc-100">
                <Experience darkMode={darkMode}  />
            </div> 
            
        </div>
        <DarkModeToggle headingColor={headingColor} darkMode={darkMode} handleDarkMode={handleDarkMode}/>
    </>
  )
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
    ])
  
    return {
      props: { allPosts },
    }
  }

export default Home