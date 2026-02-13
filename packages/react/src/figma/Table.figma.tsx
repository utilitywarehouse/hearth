import React from 'react';
import { Table } from '../components/Table/Table';
import { TableHeader } from '../components/Table/TableHeader';
import { TableHeaderCell } from '../components/Table/TableHeaderCell';
import { TableBody } from '../components/Table/TableBody';
import { TableRow } from '../components/Table/TableRow';
import { TableCell } from '../components/Table/TableCell';
import figma from '@figma/code-connect';

figma.connect(
  Table,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6403-17515&m=dev',
  {
    props: {},
    example: () => (
      <Table>
        <TableHeader>
          <TableHeaderCell>...</TableHeaderCell>
          <TableHeaderCell>...</TableHeaderCell>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  }
);
