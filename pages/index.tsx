import { subtractDays } from 'helpers/subtractDays'
import { Repo } from 'types/Repo'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Masonry from '@mui/lab/Masonry'
import { RepoCard } from '@/components/RepoCard/RepoCard'
import { useFavoriteRepos } from 'hooks/useFavoriteRepos'
import { useState } from 'react'

const label = { inputProps: { 'aria-label': 'Show only favorites' } }

export default function Home({ trendingRepos }: { trendingRepos: Repo[] }) {
  const {
    favoriteRepos,
    appendFavoriteRepo,
    removeFavoriteRepo,
    checkIsFavoriteRepo,
  } = useFavoriteRepos()

  const [isShowingFavorites, setIsShowingFavorites] = useState(false)

  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isShowingFavorites}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsShowingFavorites(event.target.checked)
              }}
            />
          }
          label="Show only favorites"
        />
      </FormGroup>

      <Masonry columns={{ xs: 1, md: 3 }} spacing={2}>
        {(isShowingFavorites ? favoriteRepos : trendingRepos).map(
          ({ id, ...repo }) => {
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
          }
        )}
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

  return {
    props: {
      trendingRepos,
    },
  }
}
