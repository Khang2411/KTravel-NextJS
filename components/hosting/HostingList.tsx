'use client'
import { useAuth } from '@/hook';
import { ResponsePaginate, Room } from '@/models';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { format, parseISO } from "date-fns";
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type HostingListProps = {
    rooms: ResponsePaginate<Room>
}

interface Data {
    id: string | number;
    image: string
    title: string;
    status: string;
    bedrooms: number;
    bathrooms: number,
    location: string
}

function createData(id: string | number, image: string, title: string, status: string, bedrooms: number, bathrooms: number, location: string): Data {
    return {
        id,
        image,
        title,
        status,
        bedrooms,
        bathrooms,
        location
    }
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}
const headCells: readonly HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'NHÀ/PHÒNG CHO THUÊ',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'TRẠNG THÁI',
    },
    {
        id: 'bedrooms',
        numeric: true,
        disablePadding: false,
        label: 'PHÒNG NGỦ',
    },
    {
        id: 'bathrooms',
        numeric: true,
        disablePadding: false,
        label: 'PHÒNG TẮM',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'VỊ TRÍ',
    }
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

//! Head Table
function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export const HostingList = ({ rooms }: HostingListProps) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('bedrooms');
    const { ref, inView } = useInView({ threshold: 0 });
    const [observer, setObserver] = useState(rooms.data);
    const { profile } = useAuth()
    const router = useRouter()

    const fetchImages = async () => {
        if (rooms.next_page_url) {
            const response = await fetch(rooms.next_page_url + `&limit=12`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            const results = await response.json();
            console.log(results);
            setObserver((prev) => [...prev, ...results.data?.data]);
            rooms.next_page_url = results.data.next_page_url
        }
    };

    useEffect(() => {
        inView && fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const rows = observer.map((room) => createData(room.id, room?.images[0]?.image ? room.images[0].image : "", room.name ? room.name : 'Được khởi tạo vào ' + format(parseISO(room.updated_at), "dd/MM/Y"), room.user.verify_account !== 1 ? 'Yêu cầu xác minh' : (room.status === null || room.status === 'processing' ? 'Đang tiến hành' : 'Hoàn thành'), room.bedroom, room.bathroom, room.address?.country),)

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)),
        [order, orderBy, rows],
    );

    const handleRow = (id: string | number) => {
        router.push(`/manage-your-space/${id}/details`)
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>

                <Box>{profile?.data.verify_account !== 1 && <Typography>Tài khoản chưa xác minh <ErrorOutlineOutlinedIcon sx={{ color: '#f44336' }} /></Typography>}</Box>
                <Box mb={2}>{profile?.data.verify_account !== 1 && <Link href={'/verify-account'} style={{ textDecoration: 'underline' }}>Xác minh ngay</Link>}</Box>

                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        {isClient && <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {visibleRows?.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => handleRow(row.id)}
                                            ref={ index === observer.length - 5 ? ref : null}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                align="center"
                                            >
                                                <Stack direction={'row'} gap={5} alignItems={'center'} padding={'10px'}>
                                                    <Image src={row.image ? row.image : 'https://a0.muscache.com/pictures/73709f4b-4e5e-4dc9-adc8-79f4df81ad3c.jpg'} width={100} height={100} alt={'listing-image'}
                                                        style={{ borderRadius: '8px' }} />
                                                    <Typography> {row.title}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center">{row.status}</TableCell>
                                            <TableCell align="center">{row.bedrooms}</TableCell>
                                            <TableCell align="center">{row.bathrooms}</TableCell>
                                            <TableCell align="center">{row.location}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>}
                    </TableContainer>
                </Paper>
            </Box >
        </>
    )
}