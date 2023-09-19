import Link from 'next/link'
import markdownStyles from './markdown-styles.module.css'
import { useContext } from 'react'
import { ThemeContext } from '../context/context'

type Props = {
  content: string,
  live: string,
  repo: string
}

const PostBody = ({ content, live, repo }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme == 'dark'? 'text-zinc-100 bg-emerald-800' : 'text-emerald-950 bg-emerald-200'} max-w-2xl py-5 px-32 mx-auto`}>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex flex-col items-center justify-center ">
        <Link href={live} className={`${theme == 'dark'? 'text-emerald-500 hover:text-red-500' : 'text-emerald-950 hover:text-amber-500'} hover:underline text-xl my-5 font-bold`}>
          Try Live Version
        </Link>
        <h1 className="text-xl font-bold">
          or
        </h1>
        <a href={repo} target='_blank' className={`${theme == 'dark'? 'text-emerald-500 hover:text-red-500' : 'text-emerald-950 hover:text-amber-500'} hover:underline font-bold text-xl my-5`}>
          Visit Code Repository
        </a>
      </div>
    </div>
  )
}

export default PostBody
