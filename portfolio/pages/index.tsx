import Container from '../components/container'
import Home from './home'
import HomeLayout from '../components/home-layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import ThemeToggle from '../components/dark-mode'

type Props = {
  allPosts: Post[];
  countries: { name:string, population:number };
  contributions: { data: { data: { user: { contributionsCollection: { contributionCalendar }}}} };
}

export default function Index({ allPosts, countries, contributions }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <HomeLayout>
      <Head>
        <title>{`${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Home allPosts={allPosts} countries={countries} contributions={contributions} />
        <ThemeToggle location='home'/>
      </Container>
    </HomeLayout>
  )
}

export const getStaticProps = async () => {

  let contributions: { weeks };

  const query:string = `
            query {
                user(login: "${process.env.GITHUB_USERNAME}") {
                contributionsCollection {
                    contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                        contributionCount
                        date
                        }
                    }
                    }
                }
                }
            }
        `;
        
        await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        })
         .then((response) => response.json())
         .then((data) => {
            contributions = data.data.user.contributionsCollection.contributionCalendar;  
        })
        .catch((error) => {
            console.error("Error fetching GitHub contributions:", error);
        });
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'images'
  ])

  return {
    props: { allPosts, contributions },
  }
}
