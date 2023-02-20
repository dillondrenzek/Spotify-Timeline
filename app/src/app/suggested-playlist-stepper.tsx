import React from 'react';
import { Link, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { ApiTypes } from 'api-types';

export interface SuggestedPlaylistStepperProps {
  suggestedPlaylists: ApiTypes.SuggestedPlaylist[];
  activePlaylist: ApiTypes.SuggestedPlaylist;
}

export function SuggestedPlaylistStepper(props: SuggestedPlaylistStepperProps) {
  const { suggestedPlaylists, activePlaylist } = props;

  return (
    <Stepper orientation="vertical">
      {suggestedPlaylists?.map((playlist) => (
        <Step
          key={playlist.startDate}
          active={playlist === activePlaylist}
          completed={false}
        >
          <StepLabel>
            <Typography variant="body2">{playlist.title}</Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
