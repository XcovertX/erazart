import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { getAllPosts } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import Post from '../../interfaces/post'
import ThemeToggle from '../../components/dark-mode'
import { useContext } from 'react'
import { ThemeContext } from '../../context/context'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(0);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          <div className={`${theme == "dark"? 'text-zinc-100' : 'text-green-950'} mt-5`}> 
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </div>
          <ThemeToggle headingColor='bg-green-600' location='codeProjects'/>
        </Container>
      </Layout>
    </>
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
