import React, { Component } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import MenuItem from "@mui/material/MenuItem"

type TopBarProps = {
  avatarUrl: string
  resumeName: string
}

const pages = [
  { label: "GitHub", url: "https://github.com/goldsziggy" },
  { label: "LinkedIn", url: "https://linkedin.com/in/matt-zygowicz" },
  { label: "Medium", url: "https://medium.com/@gem-ini" },
  { label: "HackerNoon", url: "https://hackernoon.com/u/neighborlynook" },
  { label: "Email", url: "mailto:resume@zygowicz.com" },
]

function TopBar({ avatarUrl, resumeName, ...rest }: TopBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (url: string | undefined | any) => {
    // if url is a string
    if (typeof url === "string") {
      window.open(url, "_blank")
    }
    setAnchorElNav(null)
  }

  return (
    //use material-ui react to create a topbar
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt={resumeName} src={avatarUrl} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            textAlign="center"
            display="flex"
            sx={{
              mr: 2,
              justifyContent: "center",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              typography: { xs: "h6", md: "h5" },
            }}
          >
            {resumeName}
          </Typography>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <IconButton
              size="large"
              aria-label="Resume Links"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: "block",
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu(page.url)
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
