import React, { FC } from 'react';
import './Table.scss';

export interface ColDef<T = any> {
  columnLabel?: string;
  formatGetter?: (value: any, rowNode: T) => any;
  valueGetter: (rowNode: T) => any;
}

export interface TableProps<T = any> {
  className?: string;
  colDefs: ColDef<T>[];
  rowData: T[];
}

export const Table: FC<TableProps> = ({
  className = '',
  colDefs,
  rowData
}: TableProps) => {
  return (
    <table className={`table ${className}`}>
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