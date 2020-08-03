import React, { FC } from 'react';

export interface ColDef<T = any> {
  columnLabel?: string;
  formatGetter?: (value: any, rowNode: T) => any;
  valueGetter: (rowNode: T) => any;
}

export interface TableProps<T = any> {
  colDefs: ColDef<T>[];
  rowData: T[];
}

export const Table: FC<TableProps> = ({
  colDefs,
  rowData
}: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {colDefs.map((col, i) =>(
            <th key={i}>{col.columnLabel}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData.map(
          (row, i) => (
            <tr key={i}>
              {colDefs.map((col, j) => (
                <td key={j}>{col.valueGetter(row)}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};