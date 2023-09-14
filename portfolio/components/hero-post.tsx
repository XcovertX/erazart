import Avatar from './avatar'
import DateFormatter from './date-formatter'
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
             className='flex flex-col h-full justify-center'>
      <h1 className={`text-4xl md:text-5xl mx-2 ${hover? 'text-indigo-500' : (theme == 'dark'? 'text-indigo-600' : 'text-indigo-950')} font-bold tracking-tighter leading-tight my-5`}>
        Featured Project
      </h1>
      <div className="">
        <CoverImage title={title} src={coverImage} slug={slug} mouseHover={hover}/>
      </div>
      <div className={`${hover? 'text-indigo-500' : (theme == 'dark'? 'text-indigo-600' : 'text-indigo-950')} px-2`}>
        <h3 className="mb-4 text-xl lg:text-3xl leading-tight mt-2">
              <Link
                as={`/home/${slug}`}
                href="/home/[slug]"
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
