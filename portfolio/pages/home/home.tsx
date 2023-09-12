import Link from 'next/link'
import Background from '../../pattern-gen-core/generative-background'
import SocialLinks from '../../components/social'
import HomeNav from '../../components/home-nav'
import HomeTitle from '../../components/home-title'
import ScrollButton from '../../components/scroll-button'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import ThemeToggle from '../../components/dark-mode'
import Experience from '../../components/home-experience'
import Contact from '../../components/home-contact'
import { ThemeContext } from '../../context/context'

type Props = {
    allPosts: Post[];
}

const Home = ({ allPosts }: Props) => {
    const [scrollYPosition,   setScrollYPosition] = useState(0);
    const [width,                       setWidth] = useState(0);
    const [headingColor,         setHeadingColor] = useState('bg-green-600');
    const [currentSection,     setCurrentSection] = useState(0);
    const [homeHeight,             setHomeHeight] = useState(0);
    const [expertiseHeight,   setExpertiseHeight] = useState(0);
    const [myWorkHeight,         setMyWorkHeight] = useState(0);
    const [experienceHeight, setExperienceHeight] = useState(0);
    const [contactHeight,       setContactHeight] = useState(0);
    const [totalHeight,           setTotalHeight] = useState(1000);

    const homeRef       = useRef(null);
    const expertiseRef  = useRef(null);
    const myWorkRef     = useRef(null);
    const experienceRef = useRef(null);
    const contactRef    = useRef(null);
    const totalRef      = useRef(null);
     
    const getHeadingColor = (section: number) => {
        switch(section) {
            case  0: return 'bg-green-600';
            case  1: return 'bg-teal-600';
            case  2: return 'bg-indigo-600';
            case  3: return 'bg-purple-600';
            case  4: return 'bg-rose-600';
            default: return 'bg-green-600';
        }
    }

    const getNavSection = (section: number) => {
        switch(section) {
            case  0: return 0;
            case  1: return homeHeight;
            case  2: return homeHeight + expertiseHeight;
            case  3: return homeHeight + expertiseHeight + myWorkHeight;
            case  4: return homeHeight + expertiseHeight + myWorkHeight + experienceHeight;
            default: return 0;
        }
    }

    const scrollTo = (section: number) => {
        window.scrollTo({
            top: getNavSection(section),
            behavior: 'smooth',
        });
    };

    useEffect(() => {

        function getSection() {
            return Math.floor((window.scrollY+100)/window.innerHeight);
        }

        function getSect(section: number, h: number, ex: number, w: number, exp: number, c: number) {
                if (section <  h) { return 0;} 
                if (section >= h && section <  ex + h) { return 1; }
                if (section >= ex + h  && section <  ex + h + w) { return 2; }
                if (section >= ex + h + w && section <  ex + h + w + exp) { return 3; }
                if (section >= ex + h + w + exp) { return 4; }
        }

        const updateYScrollPos = () => {
            setScrollYPosition(window.scrollY);
            let s: number, h: number, ex: number, w: number, exp: number, c: number;

            if(homeRef.current) {
                h = homeRef.current.offsetHeight;
            } else {
                h = 0;
            }
            if(expertiseRef.current) {
                ex = expertiseRef.current.offsetHeight;
            } else {
                ex = 0;
            }
            if(myWorkRef.current) {
                w = myWorkRef.current.offsetHeight;
            } else {
                w = 0;
            }
            if(experienceRef.current) {
                exp = experienceRef.current.offsetHeight;
            } else {
                exp = 0;
            }
            if(contactRef.current) {
                c = contactRef.current.offsetHeight;
            } else {
                c = 0;
            }
            s = getSect(window.scrollY, h, ex, w, exp, c);
            setCurrentSection(s);
            setHeadingColor(getHeadingColor(s));
        }

        const updateWindowSize = () => {
            setWidth(                            window.innerWidth);
            setHomeHeight(            homeRef.current.offsetHeight);
            setExpertiseHeight(  expertiseRef.current.offsetHeight);
            setMyWorkHeight(        myWorkRef.current.offsetHeight);
            setExperienceHeight(experienceRef.current.offsetHeight);
            setContactHeight(      contactRef.current.offsetHeight);
            setTotalHeight(          totalRef.current.offsetHeight);
        }

        window.addEventListener('scroll', updateYScrollPos);
        updateYScrollPos();
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();

        return () => {
            window.removeEventListener('scroll', updateYScrollPos)
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);

    const { theme } = useContext(ThemeContext);

  return (
    <>  
        <Background scrollYPosition={scrollYPosition} height={totalHeight} section={currentSection}/>
        <div className="fixed right-5 bottom-0 z-36">
            {
                scrollYPosition > 500?
                <ScrollButton top={0} direction={true} scrollTo={scrollTo} theme={theme} color={headingColor}/>
                :
                <></>
            }
        </div>
        <div className="flex flex-col h-full justify-between"
             ref={totalRef}>
            <div className="flex-col h-screen items-center justify-between flex text-zinc-100"
                 ref={homeRef}>
                <div className="items-center flex flex-col pt-5">
                    <div className="py-10">
                        <HomeNav scrollTo={scrollTo} theme={theme} section={currentSection}/>
                    </div>
                    <div className="pt-16 ">
                    <SocialLinks theme={theme}
                        color='white'
                        highlightColor='green'
                        dmColor='white'
                        dmHighlightColor='green'/>
                    </div>
                </div>
                <div className=" pt-6">
                    {/* <HomeTitle theme={theme}/> */}
                </div>
                <div className="pb-10">
                    <ScrollButton top={1} direction={false} scrollTo={scrollTo} theme={theme} color={headingColor}/>
                </div>
            </div>
            <div className="h-screen items-center justify-center text-zinc-100"
                 ref={expertiseRef}>
                <Expertise width={width} theme={theme}/>
            </div> 
            <div className="h-fit items-center justify-center text-zinc-100"
                 ref={myWorkRef}>
                <MyWork allPosts={allPosts} theme={theme}/>
            </div>            
            <div className="h-screen items-start justify-center flex text-zinc-100"
                 ref={experienceRef}>
                <Experience theme={theme}  />
            </div> 
            <div className='h-screen items-start justify-center flex text-zinc-100'
                 ref={contactRef}>
                <Contact theme={theme} />
            </div>
        </div>
        <ThemeToggle headingColor={headingColor} location='home'/>
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