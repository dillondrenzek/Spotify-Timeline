import React, { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import { useUserSavedTracks } from './use-user-saved-tracks';
import './Table.scss';

export interface ColDef<T = any> {
  columnLabel?: string;
  formatGetter?: (value: any, rowNode: T) => any;
  valueGetter: (rowNode: T) => any;
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

export interface TableProps<T = any> {
}

export function SavedTracksTable(props: TableProps) {
  const {} = props;
  const { savedTracks } = useUserSavedTracks();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {colDefs.map((col) => (
            <TableCell key={col.columnLabel}>{col.columnLabel}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {savedTracks.map(
          (row, i) => (
            <TableRow key={i}>
              {colDefs.map((col, j) => (
                <TableCell key={j}>{col.valueGetter(row)}</TableCell>
              ))}
            </TableRow>
          ))} 
      </TableBody>
    </Table>
  );
};
