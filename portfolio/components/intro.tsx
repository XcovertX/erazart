import Link from 'next/link'
import SocialLinks from './social'
import { useContext } from 'react'
import { ThemeContext } from '../context/context'
import ThemeToggle from './dark-mode'

const Intro = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <section className='flex flex-col'>
      <div className='flex flex-row justify-between mt-5'>
        <h2 className={`${theme == 'dark'? 'text-zinc-100 hover:text-green-600': 'text-green-600 hover:text-rose-600'} text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight`}>
          <Link href="/" className="hover:underline">
            James Covert
          </Link>
          .
        </h2>
        <SocialLinks theme={theme}
                     color='green'
                     highlightColor='pink'
                     dmColor='white'
                     dmHighlightColor='green'/>
      </div>

      <div className="flex-col md:flex-row flex items-center md:justify-between my-10">
        <h1 className={`${theme == 'dark'? 'text-zinc-100': 'text-green-900'} text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight `}>
          Coding Projects
        </h1>
      </div>
      <div className={`${theme == 'dark'? 'bg-green-600 text-zinc-100' : 'bg-green-600/[.3] text-green-900'} text-xl  p-5 shadow-sm`}>
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
        <p className="pt-5">
          To veiw and interact with a demonstration, follow the 'Try It Live' link at the top and bottom of each post.
        </p>
        <p className="pt-5">
          If you wish to review the code associated with the post, a link to the repository containing the code is provided in the body of each post.
        </p>
        <h3 className="flex justify-center text-center font-bold p-5">
          Thanks for viewing!
        </h3>
      </div>
    </section>
    
  )
}

export default Intro
