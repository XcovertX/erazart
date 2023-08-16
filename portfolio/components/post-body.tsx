import Link from 'next/link'
import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string,
  live: string,
  repo: string
}

const PostBody = ({ content, live, repo }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex flex-col items-center justify-center bg-slate-300">
        <Link href={live} className="hover:underline hover:text-green-500 text-xl my-5 font-bold">
          Try Live Version
        </Link>
        <h1 className="text-xl font-bold">
          or
        </h1>
        <a href={repo} target='_blank' className="hover:underline hover:text-green-500 font-bold text-xl my-5">
          Visit Code Repository
        </a>
      </div>
    </div>
  )
}

export default PostBody
