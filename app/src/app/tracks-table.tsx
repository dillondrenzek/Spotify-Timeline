import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { PlayButton } from './play-button';
import { ApiTypes } from 'api-types';

export interface ColDef<T = any> {
  columnLabel: string;
  valueGetter: (rowNode: T) => any;
  formatGetter?: (value: any, rowNode: T) => any;
}

const colDefs: ColDef<ApiTypes.Track>[] = [
  {
    columnLabel: 'Name',
    valueGetter: (row: ApiTypes.Track) => row['title'],
  },
  {
    columnLabel: 'Artist',
    valueGetter: (row: ApiTypes.Track) =>
      row['artists'].map((a) => a.name).join(' '),
  },
  {
    columnLabel: 'Date Added',
    valueGetter: (row: ApiTypes.Track) => row['addedAt'],
  },
];

interface TracksTableProps {
  tracks: ApiTypes.Track[];
  contextUri?: string;
}

export function TracksTable(props: TracksTableProps) {
  const { tracks, contextUri } = props;

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
        {tracks.map((track, i) => (
          <TrackRow track={track} contextUri={contextUri} key={i} />
        ))}
      </TableBody>
    </Table>
  );
}

function TrackRow(props: { track: ApiTypes.Track; contextUri: string }) {
  const { track, contextUri } = props;
  const uri = track?.spotifyUri;

  return (
    <TableRow>
      <TableCell sx={{ py: 0.5, px: 0.25 }}>
        <PlayButton uri={uri} contextUri={contextUri} />
      </TableCell>
      {colDefs.map((col, j) => (
        <TableCell key={j} sx={{ py: 0.5 }}>
          {col.valueGetter(track)}
        </TableCell>
      ))}
    </TableRow>
  );
}
