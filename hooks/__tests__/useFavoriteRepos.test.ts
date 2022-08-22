import { renderHook, act } from '@testing-library/react'
import { useFavoriteRepos } from '../useFavoriteRepos'
import { Repo } from 'types/Repo'

const sampleRepo: Repo = {
  id: 123,
  url: 'http://example.com',
  fullName: 'sample/repo',
  description: 'This is just a test repo',
  starsCount: 1123,
}

describe('useFavoriteRepos', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    window.localStorage.removeItem('favorites')
  })

  it('appends favorites', () => {
    const setItemSpy = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'setItem'
    )
    const { result } = renderHook(() => useFavoriteRepos())

    act(() => {
      result.current.appendFavoriteRepo(sampleRepo)
    })

    expect(result.current.favoriteRepos).toEqual([sampleRepo])
    expect(setItemSpy).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([sampleRepo])
    )
  })

  it('does not append favorites if they are already in the list', () => {
    const { result } = renderHook(() => useFavoriteRepos())

    act(() => {
      result.current.appendFavoriteRepo(sampleRepo)
    })
    act(() => {
      result.current.appendFavoriteRepo(sampleRepo)
    })

    expect(result.current.favoriteRepos).toEqual([sampleRepo])
  })

  it('reads existing favorites', () => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation(() => JSON.stringify([sampleRepo]))

    const { result } = renderHook(() => useFavoriteRepos())

    expect(result.current.favoriteRepos).toEqual([sampleRepo])
  })

  it('removes favorites', () => {
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
      .mockImplementation(() => JSON.stringify([sampleRepo]))
    const setItemSpy = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'setItem'
    )
    const { result } = renderHook(() => useFavoriteRepos())

    act(() => {
      result.current.removeFavoriteRepo(sampleRepo.id)
    })

    expect(result.current.favoriteRepos).toEqual([])
    expect(setItemSpy).toHaveBeenCalledWith('favorites', '[]')
  })

  describe('checkIsFavoriteRepo', () => {
    it('returns `true` if favorite repo is in the list', () => {
      const { result } = renderHook(() => useFavoriteRepos())

      act(() => {
        result.current.appendFavoriteRepo(sampleRepo)
      })

      expect(result.current.checkIsFavoriteRepo(sampleRepo.id)).toEqual(true)
    })

    it('returns `false` if favorite repo is not in the list', () => {
      const { result } = renderHook(() => useFavoriteRepos())

      expect(result.current.checkIsFavoriteRepo(sampleRepo.id)).toEqual(false)
    })
  })
})
