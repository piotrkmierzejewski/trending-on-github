import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Repo } from 'types/Repo'

export type RepoCardProps = Omit<Repo, 'id'>

export function RepoCard({
  url,
  fullName,
  description,
  starsCount,
}: RepoCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {fullName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {starsCount} stars
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button href={url} size="large" rel="noreferrer" target="_blank">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
