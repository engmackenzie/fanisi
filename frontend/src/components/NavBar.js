import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ heading }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (localStorage.getItem('token') && user) {
      navigate('/');
    };
  }, []);

  // Function to handle logout (replace with actual logout logic)
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  // Get initials from user's name
  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map((n) => n.charAt(0)).join('').toUpperCase();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {heading}
        </Typography>
        <Tooltip title={`${user.name} (${user.email})`}>
          <Avatar sx={{ bgcolor: 'white', width: 40, height: 40 }}>
            <span style={{ color: '#1976D2' }}>{getInitials(user.name)}</span>
          </Avatar>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
