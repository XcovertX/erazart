import Container from '../../components/container'
import Layout from '../../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import Post from '../../interfaces/post'
import CanvasHolder from '../../components/canvas-holder'
import DifferentialGrowthContainer from '../../differential-growth-core/demo-1/dif-gro-example-1'
import CodeDemoHolder from '../../components/code-demo-holder'

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
            <DifferentialGrowthContainer />
          </CodeDemoHolder>
        </Container>
      </Layout>
    </>
  )
}