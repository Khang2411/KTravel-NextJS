"use client"
import { Box, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Nhà/Phòng', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: 'price', headerName: 'Giá', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center'},
    { field: 'nights', headerName: 'Đêm', flex: 1, minWidth: 10, headerAlign: 'center', align: 'center'},
    { field: 'discount', headerName: 'Giảm giá', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: 'check_in', headerName: 'Ngày đặt', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: 'check_out', headerName: 'Ngày trả', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
    { field: 'total', headerName: 'Tổng cộng', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
];

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type ReservationTabProps = {
    reservationList: any
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const ReservationTab = ({ reservationList }: ReservationTabProps) => {
    const [value, setValue] = React.useState(0);
    const { ref, inView, entry } = useInView({ threshold: 0 });
    const [isClient, setIsClient] = React.useState(false)
    const [observer, setObserver] = React.useState(reservationList.data);
    const [dataReservation, setDataReservation] = React.useState(reservationList)
    const router = useRouter()

    const rows = observer?.map((row: { id: number; listing_id: number, listing: { name: string; }; price: number; nights: number; discount: number; check_in: string; check_out: string; total: number; }) => {
        return {
            id: row.id, name: row.listing.name, price: row.price + " $",
            nights: row.nights, discount: row.discount ? row.discount : 'Không có',
            check_in: row.check_in, check_out: row.check_out, total: row.total + " $",
            listing_id: row.listing_id
        }
    })

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    React.useEffect(() => {
        inView && fetchReservation();
        console.log(inView)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        const res = await fetch(newValue === 0 ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/list?page=1&limit=10&person=me` : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reservation/list?page=1&limit=10&person=guest`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            },
        })

        const reservation = await res.json();
        setObserver(reservation.data.data)
        setDataReservation(reservation.data)
        return
    };

    const fetchReservation = async () => {
        console.log(dataReservation?.next_page_url)
        if (dataReservation?.next_page_url) {
            const response = await fetch(value === 0 ? dataReservation.next_page_url + `&limit=10&person=me` : dataReservation.next_page_url + `&limit=10&person=guest`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            const results = await response.json();
            console.log(results);
            setObserver((prev: any) => [...prev, ...results?.data?.data]);
            dataReservation.next_page_url = results.data?.next_page_url
        }
    };

    return (
        <>
            <Box sx={{ maxWidth: '1440px', width: '100%', margin: 'auto' }}>
                <Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Bản thân" {...a11yProps(0)} />
                                <Tab label="Khách" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            {(isClient && observer) && <Box sx={{ width: '100%' }}>
                                <DataGrid
                                    sx={{
                                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                            outline: "none !important",
                                        },
                                        '& .MuiDataGrid-row:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    autoHeight={true}
                                    rows={rows}
                                    columns={columns}
                                    hideFooterPagination={true}
                                    disableColumnMenu
                                    localeText={{ noRowsLabel: "Không có dữ liệu" }}
                                    disableRowSelectionOnClick
                                    onRowClick={(event, rowData) => {
                                        console.log(event)
                                        // router.push('/rooms/' + event.row.listing_id)
                                    }}
                                />
                                <Box ref={ref}></Box>
                            </Box>}
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            {(isClient && observer) && <Box sx={{ width: '100%' }}>
                                <DataGrid
                                    sx={{
                                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                            outline: "none !important",
                                        },
                                        '& .MuiDataGrid-row:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                    rows={rows}
                                    columns={columns}
                                    hideFooterPagination={true}
                                    disableColumnMenu
                                    disableRowSelectionOnClick
                                    autoHeight={true}
                                    localeText={{ noRowsLabel: "Không có dữ liệu" }}
                                    onRowClick={(event, rowData) => {
                                        console.log(event)
                                        // router.push('/hosting/reservation/' + event.row.listing_id)
                                    }}
                                />
                                <Box ref={ref}></Box>
                            </Box>}
                        </CustomTabPanel>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
