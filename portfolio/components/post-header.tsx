import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'
import Link from 'next/link'
import { useContext } from 'react'
import { ThemeContext } from '../context/context'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  live: string
}

const PostHeader = ({ title, coverImage, date, author, live }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme == 'dark'? 'text-zinc-100' : 'text-emerald-950'}`}>
      <PostTitle>{title}</PostTitle>
      <div className="flex flex-row justify-between items-center">
        <div className="hidden md:block md:mb-6 ">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        {live == ''? 
        <></> 
          : 
        <Link href={live} className={`${theme == 'dark'? 'text-emerald-500 hover:text-red-500' : 'text-emerald-950 hover:text-amber-500'} hidden md:block md:mb-6 hover:underline text-xl font-bold`}>
          Try Live Version
        </Link>}
      </div>

      <div className="mb-8 md:mb-16 sm:mx-0 px-16">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6 flex flex-row justify-between items-center">
          <Avatar name={author.name} picture={author.picture} />
          {live == ''? 
          <></> 
            : 
          <Link href={live} className={`${theme == 'dark'? 'text-emerald-500 hover:text-red-500' : 'text-emerald-950 hover:text-amber-500'} hidden md:block md:mb-6 hover:underline text-xl font-bold`}>
            Try Live Version
          </Link>}
        </div>
        <div className="mb-2 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </div>
  )
}

export default PostHeader
