import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Repo } from 'types/Repo'
import Grid from '@mui/material/Grid'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarRateIcon from '@mui/icons-material/StarRate'
import IconButton from '@mui/material/IconButton'

export type RepoCardProps = Omit<Repo, 'id'> & {
  isFavorite: boolean
  onFavoriteClicked: () => void
}

export function RepoCard({
  isFavorite,
  onFavoriteClicked,
  url,
  fullName,
  description,
  starsCount,
}: RepoCardProps) {
  return (
    <Card sx={{ minWidth: 275 }} data-testid="repoCard">
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography
              data-testid="repoCard-fullname"
              variant="h5"
              component="div"
              style={{
                wordWrap: 'break-word',
              }}
            >
              {fullName}
            </Typography>
          </Grid>

          <Grid item>
            <IconButton data-testid={'favoriteBtn'} onClick={onFavoriteClicked}>
              {isFavorite ? (
                <StarRateIcon data-testid={'starIcon'} />
              ) : (
                <StarOutlineIcon data-testid={'starOutline'} />
              )}
            </IconButton>
          </Grid>
        </Grid>
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
