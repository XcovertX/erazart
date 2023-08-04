import Container from '../../components/container'
import Layout from '../../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import Post from '../../interfaces/post'
import CodeDemoHolder from '../../components/code-demo-holder'
import DifferentialLetters from '../../differential-growth-core/demo-2/dif-gro-example-2'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {

  return (
    <>
      <Layout>
        <Head>
          <title>{`ErazArt. ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <CodeDemoHolder>
            <DifferentialLetters />
          </CodeDemoHolder>
        </Container>
      </Layout>
    </>
  )
}
