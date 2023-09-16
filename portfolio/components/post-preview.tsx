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
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  const [hover,   setHover] =  useState(false);
  const onMouseEnter  = () =>   setHover(true);
  const onMouseLeave  = () =>  setHover(false);

  const { theme } = useContext(ThemeContext);
  return (
    <div onMouseEnter={onMouseEnter}
         onMouseLeave={onMouseLeave}
         className=''>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} mouseHover={hover}/>
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/home/${slug}`}
          href="/home/[slug]"
          className={hover? "underline": ""}
        >
          {title}
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  )
}

export default PostPreview
