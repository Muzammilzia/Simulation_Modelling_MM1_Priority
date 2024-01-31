// ResponsiveTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TableColumn {
  id: string;
  label: string;
}

interface TableData {
  [key: string]: any;
}

interface TableProps {
  columns: TableColumn[];
  data: TableData[];
}

const ResponsiveTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table size='medium' aria-label="responsive table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} sx={{ fontWeight: 'bold', borderBottom: '2px solid #dee2e6' }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResponsiveTable;
