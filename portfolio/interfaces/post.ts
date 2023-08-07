import type Author from './author'

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
}

export default PostType
