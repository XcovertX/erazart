import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'
import Link from 'next/link'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  live: string
}

const PostHeader = ({ title, coverImage, date, author, live }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="flex flex-row justify-between">
        <div className="hidden md:block md:mb-12">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <Link href={live} className="hover:underline hover:text-emerald-400 text-3xl">
            Try Live Version
        </Link>
      </div>

      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
