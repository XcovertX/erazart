import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="md:text-7xl text-5xl font-bold tracking-tighter leading-tight md:leading-none mb-6 text-center ">
      {children}
    </h1>
  )
}

export default PostTitle
