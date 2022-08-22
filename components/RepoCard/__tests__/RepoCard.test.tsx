import { render, screen, fireEvent } from '@testing-library/react'
import { RepoCard, RepoCardProps } from '../RepoCard'

describe('RepoCard', () => {
  let defaultProps: RepoCardProps

  beforeEach(() => {
    defaultProps = {
      url: 'http://example.com',
      fullName: 'sample/repo',
      description: 'This is just a test repo to show this component',
      starsCount: 1123,
      isFavorite: true,
      onFavoriteClicked: jest.fn(),
    }
  })

  it('calls onFavoriteClicked when favorite icon is clicked', () => {
    render(<RepoCard {...defaultProps} />)

    fireEvent.click(screen.getByTestId('favoriteBtn'))

    expect(defaultProps.onFavoriteClicked).toHaveBeenCalledTimes(1)
  })

  it('should show full star icon when repo is marked as favorite', () => {
    render(<RepoCard {...defaultProps} isFavorite />)

    expect(screen.getByTestId('starIcon')).toBeInTheDocument()
  })

  it('should show outline star icon when repo is not marked as favorite', () => {
    render(<RepoCard {...defaultProps} isFavorite={false} />)

    expect(screen.getByTestId('starOutline')).toBeInTheDocument()
  })
})
