import React from 'react';
import { Table } from '../src/components/Table/Table';
import { TableHeader } from '../src/components/Table/TableHeader';
import { TableHeaderCell } from '../src/components/Table/TableHeaderCell';
import { TableBody } from '../src/components/Table/TableBody';
import { TableRow } from '../src/components/Table/TableRow';
import { TableCell } from '../src/components/Table/TableCell';
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
