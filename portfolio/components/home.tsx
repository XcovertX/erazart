import Link from 'next/link'
import Background from '../pattern-gen-core/generative-background'
import SocialLinks from './social'
import HomeNav from './home-nav'
import HomeTitle from './home-title'
import ScrollButton from './scroll-button'

const Home = () => {
  return (
    <>  
        <Background />
        <div className="">
            <div className="flex-col h-screen items-center justify-between flex text-zinc-100">
                <div className="items-center flex flex-col pt-5">
                    <div >
                        <HomeNav />
                    </div>
                    <div className="pt-10">
                        <SocialLinks dark={false}/>
                    </div>
                </div>
                <div className=" pt-6">
                    <HomeTitle />
                </div>
                <div className="pt-6">
                    <ScrollButton top={1}/>
                </div>
            </div>
            <div className="flex-col h-screen items-center justify-between flex text-zinc-100">
                <div className="pt-5">
                    <HomeNav />
                </div>
                <div className="pt-8">
                    <SocialLinks dark={false}/>
                </div>
                <div className="md:pt-36 pt-6">
                    <HomeTitle />
                </div>
                <div className="pt-6">
                    <ScrollButton top={2}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home