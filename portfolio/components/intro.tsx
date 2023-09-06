import Link from 'next/link'
import SocialLinks from './social'

const Intro = () => {
  return (
    <section className="flex flex-col">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter hover:text-green-500 leading-tight">
        <Link href="/" className="hover:underline">
          James Covert
        </Link>
        .
      </h2>
      <div className="flex-col md:flex-row flex items-center md:justify-between mt-3 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
          Coding Projects
        </h1>
        <div >
          <SocialLinks darkMode={true} section={0}/>
        </div>
      </div>
      <p className="text-xl bg-slate-300 p-5 shadow-sm">
      Over the years, I have worked on a variety of projects with the following goals in mind:
        <ul className="p-5">
          <li>
            1. Sharpen my coding skills through practice
          </li>
          <li>
            2. Gain deeper understanding of design through building
          </li>
          <li>
            3. Explore complex systems through problem solving
          </li>
        </ul>
        The posts listed below document my work and allow for simple, in browser demonstration of code.
        Included in each post is a behavior description of the subject program, sample output images, and an interactive demonstration of the program behavior. 
        <p className="pt-5">
          To veiw and interact with a demonstration, follow the 'Try It Live' link at the top and bottom of each post.
        </p>
        <p className="pt-5">
          If you wish to review the code associated with the post, a link to the repository containing the code is provided in the body of each post.
        </p>
        <h3 className="flex justify-center text-center font-bold p-5">
          Thanks for viewing!
        </h3>
      </p>
    </section>
    
  )
}

export default Intro
