import React, { useCallback } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiTypes } from 'api-types';

function PlaylistListItem(props: { playlist: ApiTypes.CurrentUserPlaylist }) {
  const { playlist } = props;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/playlists/${playlist.id}`);
  }, [playlist.id, navigate]);

  return (
    <ListItem key={playlist.id} disablePadding>
      <ListItemButton sx={{ py: 0.5 }} onClick={handleClick}>
        <ListItemText primary={playlist.name} />
      </ListItemButton>
    </ListItem>
  );
}

export function PlaylistList(props: {
  playlists: ApiTypes.CurrentUserPlaylist[];
}) {
  const { playlists } = props;

  return Array.isArray(playlists) ? (
    <List>
      {playlists?.map((playlist) => (
        <PlaylistListItem key={playlist.id} playlist={playlist} />
      ))}
    </List>
  ) : (
    <Typography>No Playlists loaded.</Typography>
  );
}
