import React, { useCallback, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { ApiTypes } from 'api-types';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';

function PlaylistListItem(props: {
  playlist: ApiTypes.CurrentUserPlaylist;
  onSecondaryAction: (playlistId: string) => void;
}) {
  const { playlist, onSecondaryAction } = props;

  const navigate = useNavigate();

  const handleSecondaryAction = useCallback(() => {
    onSecondaryAction?.(playlist.id);
  }, [onSecondaryAction, playlist.id]);

  const handleClick = useCallback(() => {
    navigate(`/playlists/${playlist.id}`);
  }, [playlist.id, navigate]);

  return (
    <ListItem
      key={playlist.id}
      disablePadding
      secondaryAction={
        <IconButton edge="end" onClick={handleSecondaryAction}>
          <ClearIcon fontSize="small" />
        </IconButton>
      }
    >
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

  const { deletePlaylist, pullUserPlaylists } = useUserPlaylistsStore();

  const [removePlaylistId, setRemovePlaylistId] = useState<string>(null);

  const handleCancelRemove = useCallback(() => {
    setRemovePlaylistId(null);
  }, []);

  const handleConfirmRemove = useCallback(async () => {
    await deletePlaylist(removePlaylistId)
      .then(() => setRemovePlaylistId(null))
      .then(pullUserPlaylists);
  }, [deletePlaylist, removePlaylistId, pullUserPlaylists]);

  return (
    <>
      {Array.isArray(playlists) ? (
        <List>
          {playlists?.map((playlist) => (
            <PlaylistListItem
              key={playlist.id}
              playlist={playlist}
              onSecondaryAction={setRemovePlaylistId}
            />
          ))}
        </List>
      ) : (
        <Typography>No Playlists loaded.</Typography>
      )}
      <Dialog open={!!removePlaylistId} onClose={handleCancelRemove}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this playlist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRemove}>Cancel</Button>
          <Button color="error" onClick={handleConfirmRemove}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
