import Container from '../../components/container'
import Layout from '../../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import CodeDemoHolder from '../../components/code-demo-holder'
import GridPattern from '../../pattern-gen-core/generative-patterns'


export default function Index() {

  return (
    <>
      <Layout>
        <Head>
          <title>{`ErazArt. ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <CodeDemoHolder>
            <GridPattern />
          </CodeDemoHolder>
        </Container>
      </Layout>
    </>
  )
}