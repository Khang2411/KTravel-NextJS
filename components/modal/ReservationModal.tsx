import * as React from 'react';
import { ModalLayout } from '@/components/modal';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useModalContext } from '../room/RoomReservationMobile';
import { Calendar } from '../Calendar';

export const ReservationModal = () => {
    const { openReservationModal, setOpenReservationModal, orders } = useModalContext();

    const bodyContent = <Calendar orders={orders} />
    const footerContent = (
        <Box>
            <Box padding={'14px 0'}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography component={'span'} fontWeight={600} fontSize={16}>$165</Typography>
                        <Typography component={'span'}> / đêm</Typography>
                    </Box>

                    <Box>
                        <Button
                            variant="contained"
                            size='medium'
                            sx={{
                                backgroundColor: '#000000',
                                width: '100%',
                                borderRadius: '8px'
                            }}>
                            Đặt phòng
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
    return (
        <ModalLayout
            openModal={openReservationModal} //openLoginModal
            handleOpen={() => setOpenReservationModal(true)}
            handleClose={() => setOpenReservationModal(false)}
            title=''
            heading='Chọn ngày'
            bodyContent={bodyContent}
            footerContent={footerContent}
        />
    )
}
