import { RepoCard, RepoCardProps } from './RepoCard'

export default {
  title: 'Components/RepoCard',
  component: RepoCard,
}

const defaultProps: RepoCardProps = {
  url: 'http://example.com',
  fullName: 'sample/repo',
  description: 'This is just a test repo to show this component',
  starsCount: 1123,
}

export const RepoCardComponent = () => <RepoCard {...defaultProps} />
