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

type Props = {
    allPosts: Post[]
}

const Home = ({ allPosts }: Props) => {
    const [scrollYPosition, setScrollYPosition] = useState(0);
    const [w, setW] = useState(0);
    const [headingColor, setHeadingColor] = useState('bg-green-600');
    const [currentSection, setCurrentSection] = useState(0);
    const [darkMode, setDarkMode] = useState(true);

    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    
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
                <div className="pt-20 flex flex-row">
                    <div className="flex flex-col justify-start px-10">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                            My Work
                        </h1>
                        <div className="w-96 lg:w-[550px] flex flex-col justify-between p-5 mt-5 bg-indigo-600/[.1] border-indigo-600 border-4">
                            Over the years, I have worked on a variety of projects with the following goals in mind:
                                <div className="p-5">
                                    <li>
                                        Increase my understanding of good design and performance
                                    </li>
                                    <li>
                                        Expand my repertoire problem solving techniques
                                    </li>
                                    <li>
                                        Sharpen my coding skills through practice
                                    </li>
                                </div>
                                The posts listed below document my work and allow for simple, in browser demonstration of code.
                                Included in each post is a behavior description of the subject program, sample output images, and an interactive demonstration of the program behavior. 
                                <p className="pt-1">
                                To veiw and interact with a demonstration, follow the 'Try It Live' link at the top and bottom of each post.
                                </p>
                                <p className="pt-1">
                                If you wish to review the code associated with the post, a link to the repository containing the code is provided in the body of each post.
                                </p>
                                <h3 className="flex justify-center text-center font-bold pt-1">
                                Thanks for viewing!
                                </h3>
                            </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        {heroPost && (
                                <HeroPost
                                    title={heroPost.title}
                                    coverImage={heroPost.coverImage}
                                    date={heroPost.date}
                                    author={heroPost.author}
                                    slug={heroPost.slug}
                                    excerpt={heroPost.excerpt}
                                    live={heroPost.live}
                                />
                            )}
                    </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight my-10">
                    Projects
                </h1>
                {morePosts.length > 1 && <MoreStories posts={morePosts} />}
                <Link href={'/projects/'} className="hover:underline text-3xl md:text-4xl font-bold tracking-tighter leading-tight my-10">
                    More Projects
                </Link>
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