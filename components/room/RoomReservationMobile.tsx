'use client'
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { ReservationModal } from "../modal/ReservationModal";
import { Order } from "@/models";

export type ModalContextType = {
    openReservationModal: boolean
    setOpenReservationModal: (c: boolean) => void
    orders: Array<Order>
}
type ReservationMobileProps = {
    room: any
}
const ModalContext = React.createContext<ModalContextType>({
    openReservationModal: false,
    setOpenReservationModal: () => { },
    orders: []
})
export const RoomReservationMobile = ({ room }: ReservationMobileProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openReservationModal, setOpenReservationModal] = useState(false)
    const orders = room.orders

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
                                <Typography component={'span'} fontWeight={600} fontSize={22}>$165</Typography>
                                <Typography component={'span'}> / đêm</Typography>
                            </Box>
                            <Box>
                                <Box onClick={() => { setOpenReservationModal(!openReservationModal), setIsOpen(!isOpen) }}>
                                    <Typography sx={{ textDecoration: 'underline', cursor: 'pointer' }}>Ngày 01 - Ngày 13 tháng 7</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Button
                                variant="contained"
                                size='large'
                                sx={{
                                    backgroundColor: 'rgb(229,29,83)',
                                    width: '100%',
                                    borderRadius: '8px'
                                }}>
                                Đặt phòng
                            </Button>
                        </Box>
                    </Stack>

                </Box>
            </Box>
            <ModalContext.Provider value={{ openReservationModal, setOpenReservationModal, orders }}>
                <ReservationModal></ReservationModal>
            </ModalContext.Provider>
        </Box>
    );
}
export const useModalContext = () => useContext(ModalContext);
