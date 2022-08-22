import { useEffect, useState } from 'react'
import { Repo } from 'types/Repo'

const LOCAL_STORAGE_KEY = 'favorites'

export const useFavoriteRepos = () => {
  const [favorites, setFavorites] = useState<Repo[]>([])

  useEffect(() => {
    setFavorites(
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
    )
  }, [])

  const saveFavorites = (favorites: Repo[]) => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites))
  }

  const checkIsFavorite = (id: Repo['id']) => {
    return Boolean(favorites.find((r) => r.id === id))
  }

  const appendFavorite = (repo: Repo) => {
    if (checkIsFavorite(repo.id)) {
      return
    }

    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, repo]
      saveFavorites(newFavorites)

      return newFavorites
    })
  }

  const removeFavorite = (id: Repo['id']) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((repo) => repo.id !== id)
      saveFavorites(newFavorites)

      return newFavorites
    })
  }

  return {
    favoriteRepos: favorites,
    appendFavoriteRepo: appendFavorite,
    removeFavoriteRepo: removeFavorite,
    checkIsFavoriteRepo: checkIsFavorite,
  }
}
