import React from 'react';
import {
  Box,
  Typography,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Stack,
  ListItemButton,
} from '@mui/material';
import { useUserPlaylists } from '../hooks/use-user-playlists';

export function PlaylistList() {
  const { playlists } = useUserPlaylists();

  return (
    <List>
      {playlists.map((playlist) => (
        <ListItem key={playlist.id}>
          <ListItemButton>
            <ListItemText primary={playlist.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
