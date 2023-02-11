import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { ApiTypes } from 'api-types';

export function SavePlaylistConfirmationDialog(props: {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  playlist: ApiTypes.SuggestedPlaylist;
}) {
  const { onClose, onConfirm, open, playlist } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Save Playlist</DialogTitle>
      <DialogContentText padding={2}>
        This will save the playlist{' '}
        <Typography component="span" fontWeight={700}>
          {playlist.title}
        </Typography>{' '}
        to your Spotify Account.
        <br />
        To delete a playlist you've created, you must delete in the Spotify app.
      </DialogContentText>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={onConfirm}>
          Save Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
}
