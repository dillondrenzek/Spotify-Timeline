import React, { useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  Divider,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { grey } from '@mui/material/colors';
import { PlayButton } from '../app/play-button';
import { ApiTypes } from 'api-types';
import { useUserPlaylistsStore } from '../stores/use-user-playlists-store';
import { useUserStore } from '../stores/use-user-store';
import { useEditSuggestedPlaylist } from '../hooks/use-edit-suggested-playlist';
import { FormikHelpers, useFormik } from 'formik';

type EditTitleForm = {
  title: string;
};

function formatDate(value: string): string {
  return new Date(Date.parse(value)).toLocaleDateString();
}

function dateRangeDisplay(startDate: string, endDate: string): string {
  return `${formatDate(startDate)} to ${formatDate(endDate)}`;
}

export function TimelineSuggestedPlaylist(props: {
  playlist: ApiTypes.SuggestedPlaylist;
}) {
  const { playlist } = props;
  const { createPlaylist } = useUserPlaylistsStore();
  const { currentUser } = useUserStore();

  // Update Suggested Playlist
  const [state, dispatch] = useEditSuggestedPlaylist(playlist);

  const handleClickSave = useCallback(() => {
    createPlaylist({
      name: state.value.title,
      track_uris: state.value.tracks.map((t) => t.spotifyUri),
      user_id: currentUser.id,
    });
  }, [createPlaylist, state.value, currentUser]);

  // New Title
  const [isTextField, setIsTextField] = useState(false);

  const onSubmit = useCallback<
    (
      values: EditTitleForm,
      formikHelpers: FormikHelpers<EditTitleForm>
    ) => void | Promise<any>
  >(
    (values) => {
      dispatch({
        data: values.title,
        type: 'UPDATE_TITLE',
      });

      setIsTextField(false);
    },
    [dispatch]
  );

  const { handleChange, handleSubmit, values, handleReset } =
    useFormik<EditTitleForm>({
      initialValues: { title: state.value.title },
      onSubmit,
    });

  const handleClickTitle = useCallback(() => {
    setIsTextField(true);
  }, []);

  const handleCancelTextField = useCallback(() => {
    handleReset({ values: state.value });
  }, [handleReset, state.value]);

  return (
    <List>
      <ListItem>
        <ListItemText>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '50%' }}>
              {isTextField ? (
                <Stack
                  component="form"
                  direction="row"
                  spacing={0.25}
                  sx={{ alignItems: 'center' }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    name="title"
                    value={values.title}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                  />
                  <IconButton type="submit">
                    <CheckCircleOutlineIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelTextField}>
                    <DoNotDisturbIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Typography
                  variant="h6"
                  sx={{ width: '100%' }}
                  onClick={handleClickTitle}
                >
                  {state.value.title}
                </Typography>
              )}
            </Box>

            <Stack direction="row" alignItems="center" spacing={3}>
              <Stack
                direction="column"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Typography variant="caption">
                  {playlist.tracks.length} tracks
                </Typography>
                <Typography variant="caption">
                  {dateRangeDisplay(playlist.startDate, playlist.endDate)}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                color="success"
                onClick={handleClickSave}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </ListItemText>
      </ListItem>
      <Divider />
      {!!playlist.tracks?.length ? (
        playlist.tracks.map((track, i) => (
          <ListItemButton key={i.toString()}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <PlayButton uri={track?.spotifyUri} />
                <Stack direction="column">
                  <Typography>{track?.title || 'Untitled'}</Typography>
                  <Stack direction="row" spacing={1}>
                    {track?.artists.map((artist, i) => (
                      <Typography
                        variant="caption"
                        key={i}
                        sx={{ color: grey[400] }}
                      >
                        {artist.name}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
              <Typography variant="caption">
                {formatDate(track.addedAt)}
              </Typography>
            </Stack>
          </ListItemButton>
        ))
      ) : (
        <ListItem>
          <ListItemText>No tracks for this playlist</ListItemText>
        </ListItem>
      )}
    </List>
  );
}
