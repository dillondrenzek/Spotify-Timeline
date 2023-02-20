import React, { useEffect, useRef } from 'react';
import { Stepper, Step, StepLabel, Typography } from '@mui/material';
import { ApiTypes } from 'api-types';

function SuggestedPlaylistStepperItem(props: {
  active: boolean;
  playlist: ApiTypes.SuggestedPlaylist;
}) {
  const { playlist, active } = props;
  const elementRef = useRef<HTMLElement>();

  useEffect(() => {
    if (active) {
      elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [active]);

  return (
    <Step
      ref={elementRef}
      key={playlist.startDate}
      active={active}
      completed={false}
    >
      <StepLabel icon={<div style={{ height: '10px', width: '10px' }} />}>
        <Typography variant="body2">{playlist.title}</Typography>
      </StepLabel>
    </Step>
  );
}

export interface SuggestedPlaylistStepperProps {
  suggestedPlaylists: ApiTypes.SuggestedPlaylist[];
  activePlaylist: ApiTypes.SuggestedPlaylist;
}

export function SuggestedPlaylistStepper(props: SuggestedPlaylistStepperProps) {
  const { suggestedPlaylists, activePlaylist } = props;

  return (
    <Stepper orientation="vertical">
      {suggestedPlaylists?.map((playlist) => (
        <SuggestedPlaylistStepperItem
          key={playlist.startDate}
          playlist={playlist}
          active={playlist === activePlaylist}
        />
      ))}
    </Stepper>
  );
}
