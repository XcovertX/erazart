import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import { useContext, useState } from 'react'
import { ThemeContext } from '../context/context'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  live: string
}

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  live
}: Props) => {
  const [hover,   setHover] =  useState(false);
  const onMouseEnter  = () =>   setHover(true);
  const onMouseLeave  = () =>  setHover(false);
  const { theme } = useContext(ThemeContext);
  return (
    <section onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             className='flex flex-col h-auto justify-between'>
      <h1 className={`text-4xl md:text-5xl mx-2 ${hover? (theme == 'dark'? 'text-red-600' : 'text-amber-500') : (theme == 'dark'? 'text-emerald-500' : 'text-emerald-950')} font-bold tracking-tighter leading-tight my-5`}>
        Featured Project
      </h1>
      <div className="">
        <CoverImage title={title} src={coverImage} slug={slug} mouseHover={hover}/>
      </div>
      <div className={`${hover? (theme == 'dark'? 'text-red-600' : 'text-amber-500') : (theme == 'dark'? 'text-emerald-500' : 'text-emerald-950')} font-bold tracking-tighter leading-tight px-2`}>
        <h3 className="mb-4 text-xl lg:text-3xl leading-tight mt-2">
              <Link
                as={`/projects/${slug}`}
                href="/projects/[slug]"
                className={hover? "underline": ""}
              >
                {title}
              </Link>
          </h3>
          <p className="text-lg leading-relaxed">{excerpt}</p>
      </div>
    </section>
  )
}

export default HeroPost
