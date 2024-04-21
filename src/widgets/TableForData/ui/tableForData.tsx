import {
    MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    flexRender,
    type MRT_ColumnDef,
    useMaterialReactTable, MRT_RowData, MRT_TableOptions,
} from 'material-react-table';
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import {useMutation} from "@apollo/client";

import {DocumentNode} from "graphql";
import {Button} from "@mui/base";

type IdType = string | number;
interface TableProps<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
    DELETE_MUTATION: DocumentNode;
    removeFromCash: (id: IdType[] ) => Promise<void>
}


export const TableForData = <TData extends MRT_RowData>({data, columns, DELETE_MUTATION, removeFromCash}: TableProps<TData>) => {
    console.log(data)
    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: true,
        initialState: {
            pagination: {pageSize: 20, pageIndex: 0},
            showGlobalFilter: true,
        },

        muiPaginationProps: {
            rowsPerPageOptions: [5, 10, 15],
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
    });

    const [deleteMutation] = useMutation(DELETE_MUTATION)
    const handleDeleteRows = async () => {
        const selectedRowModel = table.getSelectedRowModel();
        const selectedRows = selectedRowModel.rows
        const selectedRowsId:number[] = selectedRows.map(row => row.original.id)
        await removeFromCash(selectedRowsId)
        if (!selectedRows || selectedRows.length === 0) return;

        const deletePromises = selectedRows.map(row =>
            deleteMutation({
                variables: {
                    input: {
                        id: Number(row.original.id)
                    }
                },
            }).then(result => {
                if (!result || result.errors) {
                    console.error('Ошибка удаления:', result.errors);
                    return null;
                }
                return result.data;
            }).catch(error => {

                console.error('Ошибка удаления:', error);
                return null;
            })
        );


        const results = await Promise.all(deletePromises);


        console.log('Результаты удаления:', results);
    }

    return (
        <Stack sx={{m: '2rem 0'}}>
            <Typography variant="h4">Карты</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >

                <MRT_GlobalFilterTextField table={table}/>
                <MRT_TablePagination table={table}/>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '1rem',
                }}
            >
                <Button onClick={handleDeleteRows} color="error">
                    Удалить выбранные
                </Button>
            </Box>
            <TableContainer>
                <Table>

                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell align="center" variant="head" key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.Header ??
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row, rowIndex) => (
                            <TableRow key={row.id} selected={row.getIsSelected()}>
                                {row.getVisibleCells().map((cell, _columnIndex) => (
                                    <TableCell align="center" variant="body" key={cell.id}>

                                        <MRT_TableBodyCellValue
                                            cell={cell}
                                            table={table}
                                            staticRowIndex={rowIndex}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <MRT_ToolbarAlertBanner stackAlertBanner table={table}/>
        </Stack>
    );
};

export default TableForData;
