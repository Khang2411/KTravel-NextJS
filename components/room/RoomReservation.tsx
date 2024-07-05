'use client'
import { useAuth } from "@/hook";
import { Room } from "@/models";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { RoomCalendar } from ".";
import { NumberInput } from "./NumberInput";
import { ModalContext } from "../common";
import { LoginModal } from "../modal";

type RoomReservation = {
    room: Room
}

export const RoomReservation = ({ room }: RoomReservation) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const { isLoggedIn } = useAuth()
    const [adult, setAdult] = React.useState<number>(Number(searchParams.get("adult") as string) ? Number(searchParams.get("adult") as string) : 1)
    const [child, setChild] = React.useState<number>(Number(searchParams.get("child") as string) ? Number(searchParams.get("child") as string) : 0)
    const [nights, setNights] = React.useState<number>(1)
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [openRegModal, setOpenRegModal] = useState(false);

    React.useEffect(() => {
        const check_in = searchParams.get('check_in') as unknown as Date;
        const check_out = searchParams.get('check_out') as unknown as Date;
        const arrayDisabled = getDatesInRange(check_in, check_out) as [];
        const disabled = [].concat.apply([], arrayDisabled)
        setNights(disabled.length - 1)
    }, [searchParams])

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

    const handleChangeAdult = (e: React.FocusEvent<HTMLInputElement, Element> | React.PointerEvent<Element> | React.KeyboardEvent<Element>, val: number) => {
        setAdult(val as number);
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        current.set("adult", val.toString());
        const search = current.toString();
        router.push(`${pathname}?${search}`, { scroll: false })
    }

    const handleChangeChild = (e: React.FocusEvent<HTMLInputElement, Element> | React.PointerEvent<Element> | React.KeyboardEvent<Element>, val: number) => {
        setChild(val as number);
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        current.set("child", val.toString());
        const search = current.toString();
        router.push(`${pathname}?${search}`, { scroll: false })
    }

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
            setOpenLoginModal(!openLoginModal);
        }
    }

    return (
        <>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box sx={{
                    position: 'sticky',
                    top: '80px',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                    padding: '24px',
                    borderRadius: '14px',
                }}>
                    <Box>
                        <Typography component={'span'} fontWeight={600} fontSize={22}>${room.price}</Typography>
                        <Typography component={'span'}> / đêm</Typography>
                    </Box>
                    <Box>
                        <Box borderRadius={'8px'}>
                            <RoomCalendar orders={room.orders}></RoomCalendar>
                        </Box>
                        <Box>
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} margin={'10px 0'}>
                                <Box><Typography>Người lớn</Typography></Box>
                                <NumberInput aria-label="Quantity Input" min={1} max={room.adult}
                                    value={adult} onChange={(e, val) => handleChangeAdult(e, val as number)} />
                            </Stack>
                        </Box>
                        <Box>
                            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} margin={'10px 0'}>
                                <Box><Typography>Trẻ em</Typography></Box>
                                <NumberInput aria-label="Quantity Input" min={0} max={room.child}
                                    value={child} onChange={(e, val) => handleChangeChild(e, val as number)} />
                            </Stack>
                        </Box>
                        <Divider />
                        <Box>
                            <Stack direction={'row'} justifyContent={'space-between'} margin={'16px 0'}>
                                <Typography>{room.price} x {nights} đêm </Typography>
                                <Typography>${room.price * nights} </Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Button onClick={handleBookRoom}
                                variant="contained"
                                size='large'
                                sx={{
                                    backgroundColor: 'rgb(229,29,83) !important',
                                    width: '100%'
                                }}>
                                Đặt phòng
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ModalContext.Provider value={{ openLoginModal, setOpenLoginModal, openRegModal, setOpenRegModal }}>
                <LoginModal />
            </ModalContext.Provider>
        </>
    );
}

