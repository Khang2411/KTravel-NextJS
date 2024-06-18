'use client'
import { Order, Room } from "@/models";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { ReservationModal } from "../modal/ReservationModal";
import { useAuth } from "@/hook";
import { LoginModal } from "../modal";
import { ModalContextRoomMobile } from "../common/header/HeaderRoomMobile";

type ReservationMobileProps = {
    room: Room
}

type ModalContextType = {
    openReservationModal: boolean
    setOpenReservationModal: (c: boolean) => void
    orders: Order[],
    price: number,
    nights: number
}

export const ModalContext = React.createContext<ModalContextType>({
    openReservationModal: false,
    setOpenReservationModal: () => { },
    orders: [],
    price: 0,
    nights: 0
})

function getDatesInRange(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate)

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

export const RoomReservationMobile = ({ room }: ReservationMobileProps) => {
    const [nightsCalendar, setNightsCalendar] = useState<number>(1)
    const searchParams = useSearchParams()
    const router = useRouter()
    const [openReservationModal, setOpenReservationModal] = useState(false)
    const [openLoginMobile, setOpenLoginMobile] = useState(false);

    const orders = room.orders
    const price = room.price
    const nights = nightsCalendar
    const { isLoggedIn } = useAuth()

    React.useEffect(() => {
        const check_in = searchParams.get('check_in') as unknown as Date;
        const check_out = searchParams.get('check_out') as unknown as Date;
        const arrayDisabled = getDatesInRange(check_in, check_out) as [];
        const disabled = [].concat.apply([], arrayDisabled)
        setNightsCalendar(disabled.length - 1)
    }, [searchParams])

    const handleBookRoom = () => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        const search = current.toString();
        console.log(search);
        if (!searchParams.get('adult')) {
            current.set("adult", '1');
        }
        if (!searchParams.get('child')) {
            current.set("child", '0');
        }
        if (isLoggedIn) {
            router.push(`/book/${room.id}?${search}`)
        } else {
            setOpenLoginMobile(!openLoginMobile)
        }
    }

    return (
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Box sx={{
                width: '100%',
                padding: '0 24px',
                boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;',
                backgroundColor: '#ffff',
                position: 'fixed',
                bottom: '0',
                zIndex: '999',

            }}>
                <Box sx={{ padding: '16px 0' }}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Box>
                            <Box>
                                <Typography component={'span'} fontWeight={600} fontSize={22}>${room.price}</Typography>
                                <Typography component={'span'}> / đêm</Typography>
                            </Box>
                            <Box>
                                <Box onClick={() => { setOpenReservationModal(!openReservationModal) }}>
                                    <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                        {(searchParams.get('check_in') as string)?.split("/").reverse().join("/")} - {(searchParams.get('check_out') as string)?.split("/").reverse().join("/")}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Button
                                onClick={handleBookRoom}
                                variant="contained"
                                size='large'
                                sx={{
                                    backgroundColor: 'rgb(229,29,83) !important',
                                    width: '100%',
                                    borderRadius: '8px'
                                }}>
                                Đặt phòng
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
            <ModalContextRoomMobile.Provider value={{ openLoginMobile, setOpenLoginMobile }}>
                <LoginModal />
            </ModalContextRoomMobile.Provider>

            <ModalContext.Provider value={{ openReservationModal, setOpenReservationModal, orders, price, nights }}>
                <ReservationModal />
            </ModalContext.Provider>
        </Box>
    );
}
