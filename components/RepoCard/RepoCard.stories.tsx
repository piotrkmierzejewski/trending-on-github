import { RepoCard, RepoCardProps } from './RepoCard'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/RepoCard',
  component: RepoCard,
}

const defaultProps: RepoCardProps = {
  url: 'http://example.com',
  fullName: 'sample/repo',
  description: 'This is just a test repo to show this component',
  starsCount: 1123,
  isFavorite: true,
  onFavoriteClicked: action('onFavoriteClicked'),
}

export const RepoCardComponent = () => <RepoCard {...defaultProps} />
