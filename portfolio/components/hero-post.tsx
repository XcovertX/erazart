import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import { useState } from 'react'

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
  return (
    <section onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             className=''>
      <h1 className={`text-2xl md:text-3xl mx-2 ${hover? 'text-indigo-300' :'text-indigo-600'} font-bold tracking-tighter leading-tight my-5`}>
        Featured Project
      </h1>
      <div className="">
        <CoverImage title={title} src={coverImage} slug={slug} mouseHover={hover}/>
      </div>
      <div className={`grid grid-cols-1 pt-5 pb-20 md:pb-28 ${hover? 'text-indigo-300' :'text-indigo-600'} px-2 `}>
        <div>
          <h3 className="mb-4 text-xl lg:text-3xl leading-tight">
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
      </div>
    </section>
  )
}

export default HeroPost
