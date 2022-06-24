import React, { useCallback } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useUserSavedTracks } from '../hooks/use-user-saved-tracks';
import { usePlayButton } from '../hooks/use-play-button';

export interface ColDef<T = any> {
  columnLabel: string;
  valueGetter: (rowNode: T) => any;
  formatGetter?: (value: any, rowNode: T) => any;
}

const colDefs: ColDef<SpotifyApi.SavedSongs>[] = [
  {
    columnLabel: 'Name',
    valueGetter: (row: SpotifyApi.SavedSongs) =>
      row['track'] ? row['track']['name'] : '',
  },
  {
    columnLabel: 'Artist',
    valueGetter: (row: SpotifyApi.SavedSongs) =>
      row['track'] ? row['track']['artists'][0]['name'] : '',
  },
  {
    columnLabel: 'Date Added',
    valueGetter: (row: SpotifyApi.SavedSongs) => row['added_at'],
  },
];

export function SavedTracksTable() {
  const { savedTracks } = useUserSavedTracks();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {colDefs.map((col) => (
            <TableCell key={col.columnLabel}>{col.columnLabel}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {savedTracks?.map((row, i) => (
          <SavedTrackRow track={row} key={row.track.id} />
        ))}
      </TableBody>
    </Table>
  );
}

function SavedTrackRow(props: {
  track: SpotifyApi.SavedSongs;
  contextUri?: string;
}): JSX.Element {
  const { track, contextUri } = props;

  const clickPlay = usePlayButton(track.track.uri, contextUri);

  return (
    <TableRow>
      <TableCell>
        <Button onClick={clickPlay}>Play</Button>
      </TableCell>
      {colDefs.map((col, j) => (
        <TableCell key={j}>{col.valueGetter(track)}</TableCell>
      ))}
    </TableRow>
  );
}
