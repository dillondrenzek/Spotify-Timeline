import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useUserSavedTracks } from '../hooks/use-user-saved-tracks';
import { PlayButton } from './play-button';

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
          <TableCell sx={{ py: 0.5 }}></TableCell>
          {colDefs.map((col) => (
            <TableCell key={col.columnLabel} sx={{ py: 0 }}>
              {col.columnLabel}
            </TableCell>
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

  return (
    <TableRow>
      <TableCell sx={{ py: 0.5, px: 0.25, width: '36px', textAlign: 'center' }}>
        <PlayButton uri={track?.track.uri} contextUri={contextUri} />
      </TableCell>
      {colDefs.map((col, j) => (
        <TableCell key={j} sx={{ py: 0.5 }}>
          {col.valueGetter(track)}
        </TableCell>
      ))}
    </TableRow>
  );
}
