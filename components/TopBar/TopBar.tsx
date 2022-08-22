import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'

export function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <LeaderboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" component="div">
            Trending on GitHub
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
