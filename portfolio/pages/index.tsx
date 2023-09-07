import Container from '../components/container'
import Home from '../pages/home/home'
import HomeLayout from '../components/home-layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'

type Props = {
  allPosts: Post[];
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <HomeLayout>
      <Head>
        <title>{`${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Home allPosts={allPosts} />
      </Container>
    </HomeLayout>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
