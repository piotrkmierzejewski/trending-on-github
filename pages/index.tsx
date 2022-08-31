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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

const ALL_LANGUAGES = 'all-languages'

export default function Home({
  perPage,
  ordering,
  trendingRepos,
}: {
  perPage: string
  ordering: string
  trendingRepos: Repo[]
}) {
  const {
    favoriteRepos,
    appendFavoriteRepo,
    removeFavoriteRepo,
    checkIsFavoriteRepo,
  } = useFavoriteRepos()
  const router = useRouter()
  const [isShowingFavorites, setIsShowingFavorites] = useState(false)
  const [selectedOrdering, setSelectedOrdering] = useState(ordering)
  const [selectedPerPage, setSelectedPerPage] = useState(perPage)
  const [selectedLanguage, setSelectedLanguage] = useState('all-languages')
  const languages = [
    {
      value: ALL_LANGUAGES,
      label: 'All languages',
    },
    ...Array.from(
      new Set(trendingRepos.map((repo) => repo.language).filter(Boolean))
    ).map((language) => ({
      value: language,
      label: language,
    })),
  ]

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedPerPage(e.target.value)
    router.replace({
      query: { ...router.query, perPage: e.target.value },
    })
  }

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setSelectedLanguage(e.target.value)
  }

  const handleOrderingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOrdering = event.target.checked ? 'desc' : 'asc'
    setSelectedOrdering(newOrdering)
    router.replace({
      query: { ...router.query, ordering: newOrdering },
    })
  }

  let reposToRender = trendingRepos
  if (isShowingFavorites) {
    reposToRender = favoriteRepos
  }
  if (selectedLanguage !== ALL_LANGUAGES) {
    reposToRender = reposToRender.filter(
      (repo) => repo.language === selectedLanguage
    )
  }

  return (
    <Container maxWidth="lg" sx={{ my: 10 }}>
      <Head>
        <title>Trending on GitHub</title>
      </Head>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              data-testid="favoritesSwitch"
              checked={isShowingFavorites}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsShowingFavorites(event.target.checked)
              }}
            />
          }
          label="Show only favorites"
        />
        <FormControlLabel
          control={
            <Switch
              checked={selectedOrdering === 'desc'}
              onChange={handleOrderingChange}
            />
          }
          label="DESC"
        />

        <FormControl sx={{ mb: 2, mr: 2, minWidth: 80 }}>
          <InputLabel id="per-page-select-label">Per page</InputLabel>
          <Select
            labelId="per-page-select-label"
            id="per-page-select"
            value={selectedPerPage}
            label="Per page"
            onChange={handleChange}
          >
            {Array.from(Array(10).keys())
              .map((key) => (key + 1) * 10)
              .map((value) => (
                <MenuItem key={value} value={String(value)}>
                  {value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={selectedLanguage}
            label="Language"
            onChange={handleLanguageChange}
          >
            {languages.map(({ value, label }) => (
              <MenuItem key={value} value={String(value)}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGroup>

      <Masonry columns={{ xs: 1, md: 3 }} spacing={2}>
        {reposToRender.map(({ id, ...repo }) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const perPage = context.query.perPage || '20'
  const ordering = context.query.ordering || 'desc'
  const createdAt = subtractDays(new Date(), 7).toISOString().split('T')[0]
  const trendingRequest = await fetch(
    `https://api.github.com/search/repositories?q=created:>${createdAt}&sort=stars&order=${ordering}&per_page=${perPage}`
  )
  const repos = await trendingRequest.json()

  return {
    props: {
      perPage,
      ordering,
      trendingRepos: repos.items.map(
        (trendingRepo: any): Repo => ({
          id: trendingRepo.id,
          url: trendingRepo.html_url,
          fullName: trendingRepo.full_name,
          description: trendingRepo.description,
          starsCount: trendingRepo.stargazers_count,
          language: trendingRepo.language,
        })
      ),
    },
  }
}
