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
  contributions: { weeks: [] };
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
        <Home allPosts={allPosts} contributions={contributions} />
        <ThemeToggle location='home'/>
      </Container>
    </HomeLayout>
  )
}

export const getStaticProps = async () => {
  const now = new Date();
  const to = now.toISOString();
  const from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString();

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
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

  let contributions = null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          login: process.env.GITHUB_USERNAME,
          from,
          to,
        },
      }),
    });
    const json = await res.json();
    contributions = json.data.user.contributionsCollection.contributionCalendar;
  } catch (e) {
    console.error("Error fetching GitHub contributions:", e);
  }

  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "images",
  ]);

  return {
    props: { allPosts, contributions },
    revalidate: 60 * 60 * 24, // revalidate once per day (adjust to taste)
  };
};
