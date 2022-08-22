import { subtractDays } from 'helpers/subtractDays'
import { Repo } from 'types/Repo'
import { Container } from '@mui/material'
import Masonry from '@mui/lab/Masonry'
import { RepoCard } from '@/components/RepoCard/RepoCard'
import { useFavoriteRepos } from 'hooks/useFavoriteRepos'

export default function Home({ trendingRepos }: { trendingRepos: Repo[] }) {
  const { appendFavoriteRepo, removeFavoriteRepo, checkIsFavoriteRepo } =
    useFavoriteRepos()

  console.log(favoriteRepos)

  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
      <Masonry columns={{ xs: 1, md: 3 }} spacing={2}>
        {trendingRepos.map(({ id, ...repo }) => {
          const isFavorite = checkIsFavoriteRepo(id)
          return (
            <RepoCard
              key={id}
              {...repo}
              isFavorite={isFavorite}
              onFavoriteClicked={() => {
                isFavorite
                  ? removeFavoriteRepo(id)
                  : appendFavoriteRepo({ id, ...repo })
              }}
            />
          )
        })}
      </Masonry>
    </Container>
  )
}

export async function getServerSideProps() {
  const createdAt = subtractDays(new Date(), 7).toISOString().split('T')[0]
  const trendingRequest = await fetch(
    `https://api.github.com/search/repositories?q=created:>${createdAt}&sort=stars&order=desc&per_page=20`
  )

  const trendingRepos = (await trendingRequest.json()).items.map(
    (trendingRepo: any): Repo => ({
      id: trendingRepo.id,
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
