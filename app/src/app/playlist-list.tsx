import React, { useCallback } from 'react';
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
import { useNavigate } from 'react-router-dom';

function PlaylistListItem(props: { playlist: SpotifyApi.CurrentUserPlaylist }) {
  const { playlist } = props;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/playlists/${playlist.id}`);
  }, [playlist.id]);

  return (
    <ListItem key={playlist.id}>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={playlist.name} />
      </ListItemButton>
    </ListItem>
  );
}

export function PlaylistList(props: {
  playlists: SpotifyApi.CurrentUserPlaylist[];
}) {
  const { playlists } = props;

  return (
    <List>
      {playlists.map((playlist) => (
        <PlaylistListItem playlist={playlist} />
      ))}
    </List>
  );
}
