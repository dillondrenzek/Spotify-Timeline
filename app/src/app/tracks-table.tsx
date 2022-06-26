import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
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

function TrackRow(props: { track: SpotifyApi.SavedSongs; contextUri: string }) {
  const { track, contextUri } = props;
  const uri = track?.track?.uri;

  return (
    <TableRow>
      <TableCell>
        <PlayButton uri={uri} contextUri={contextUri} />
      </TableCell>
      {colDefs.map((col, j) => (
        <TableCell key={j}>{col.valueGetter(track)}</TableCell>
      ))}
    </TableRow>
  );
}

interface TracksTableProps {
  tracks: SpotifyApi.SavedSongs[];
  contextUri?: string;
}

export function TracksTable(props: TracksTableProps) {
  const { tracks, contextUri } = props;

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
        {tracks.map((track, i) => (
          <TrackRow track={track} contextUri={contextUri} key={i} />
        ))}
      </TableBody>
    </Table>
  );
}
