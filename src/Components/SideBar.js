import React from 'react';
import SidebarOption from './SideBarOption';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import './SideBar.css';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={SearchIcon} text="Search" />
      <SidebarOption Icon={NotificationsIcon} text="Notifications" />
      <SidebarOption Icon={PersonIcon} text="Profile" />
      {/* Add more SidebarOption components here as needed */}
    </div>
  );
}

export default Sidebar;
