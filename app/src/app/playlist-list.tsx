import React, { useCallback } from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PlaylistListItem(props: { playlist: SpotifyApi.CurrentUserPlaylist }) {
  const { playlist } = props;

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/playlists/${playlist.id}`);
  }, [playlist.id, navigate]);

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

  return Array.isArray(playlists) ? (
    <List>
      {playlists?.map((playlist) => (
        <PlaylistListItem key={playlist.id} playlist={playlist} />
      ))}
    </List>
  ) : null;
}
