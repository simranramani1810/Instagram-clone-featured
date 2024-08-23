import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import './SideBar.css';

function SidebarOption({ Icon, text, onClick }) {
  return (
    <ListItem button onClick={onClick} className="sidebarOption">
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default SidebarOption;
