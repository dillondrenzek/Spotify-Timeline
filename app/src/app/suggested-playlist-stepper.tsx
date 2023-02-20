import React from 'react';
import { Link, Stepper, Step, StepLabel } from '@mui/material';
import { formatDate } from '../lib/formatters';
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
            <Link
              component="button"
              variant="body2"
              color="secondary"
              underline="hover"
            >
              {formatDate(playlist?.startDate)}
            </Link>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
