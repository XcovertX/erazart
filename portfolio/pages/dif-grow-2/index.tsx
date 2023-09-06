import Container from '../../components/container'
import Layout from '../../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import CodeDemoHolder from '../../components/code-demo-holder'
import DifferentialLetters from '../../differential-growth-core/demo-2/dif-gro-example-2'


export default function Index() {

  return (
    <>
      <Layout>
        <Head>
          <title>{`${CMS_NAME}`}</title>
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