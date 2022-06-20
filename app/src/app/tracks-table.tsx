import React, { useCallback } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSpotifyPlayer } from '../hooks/use-spotify-player';

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

function TrackRow(props: { track: SpotifyApi.SavedSongs }) {
  const { track } = props;
  const uri = track?.track?.uri;

  const { play } = useSpotifyPlayer();

  const handleClickPlay = useCallback(() => {
    if (!uri) {
      return;
    }
    play(uri);
    console.log('play', uri);
  }, [play, uri]);

  return (
    <TableRow>
      <TableCell>
        <Button onClick={handleClickPlay}>Play</Button>
      </TableCell>
      {colDefs.map((col, j) => (
        <TableCell key={j}>{col.valueGetter(track)}</TableCell>
      ))}
    </TableRow>
  );
}

interface TracksTableProps {
  tracks: SpotifyApi.SavedSongs[];
}

export function TracksTable(props: TracksTableProps) {
  const { tracks } = props;

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
          <TrackRow track={track} key={i} />
        ))}
      </TableBody>
    </Table>
  );
}
