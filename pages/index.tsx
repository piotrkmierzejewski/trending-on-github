import Head from 'next/head'
import Image from 'next/image'

import styles from '@/pages/index.module.css'
import { subtractDays } from 'helpers/subtractDays'
import { Repo } from 'types/Repo'

export default function Home({ trendingRepos }: { trendingRepos: Repo[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a href="https://vercel.com/new" className={styles.card}>
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const createdAt = subtractDays(new Date(), 7).toISOString().split('T')[0]
  console.log({ createdAt })
  const trendingRequest = await fetch(
    `https://api.github.com/search/repositories?q=created:>${createdAt}&sort=stars&order=desc&per_page=20`
  )

  const trendingRepos = (await trendingRequest.json()).items.map(
    (trendingRepo: any): Repo => ({
      url: trendingRepo.html_url,
      fullName: trendingRepo.full_name,
      description: trendingRepo.description,
      starsCount: trendingRepo.stargazers_count,
    })
  )
  console.log({ trendingRepos })

  return {
    props: {
      trendingRepos,
    },
  }
}
