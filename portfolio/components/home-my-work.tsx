import HeroPost from "./hero-post";
import Post from '../interfaces/post';
import Link from "next/link";
import MoreStories from "./more-stories";

type Props = {
    allPosts: Post[];
    darkMode: boolean;
}

const MyWork = ({allPosts, darkMode}: Props) => {

    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)

    return(
        <div className='h-fit w-full flex flex-col justify-between'>
            <div  className={`pt-20 flex-col items-center justify-between flex ${darkMode? 'text-zinc-100' : "text-indigo-950"}`}>
                <div className="flex flex-col lg:flex-row justify-center w-full">
                    <div className="w-full lg:w-1/2 flex flex-col justify-between">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
                            My Work
                        </h1>
                        <div className="flex flex-col justify-between p-5 mt-5 bg-indigo-600/[.1] border-indigo-600 border-4">
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
                    <div className="w-auto ml-10 pt-5">
                        {HeroPost && (
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
            </div>
            <div  className={`flex-col items-center justify-start flex ${darkMode? 'text-zinc-100' : 'text-indigo-900'} pt-5`}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight my-10">
                    Projects
                </h1>
                {morePosts.length > 1 && <MoreStories posts={morePosts} />}
                <Link href={'/projects/'} className="hover:underline text-3xl md:text-4xl font-bold tracking-tighter leading-tight ">
                    More Projects
                </Link>
            </div>  
        </div>
    )
}


export default MyWork