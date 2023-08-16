import type Author from './author'
import Image from './image'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  live: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  images: Image[]
  repo: string
}

export default PostType
