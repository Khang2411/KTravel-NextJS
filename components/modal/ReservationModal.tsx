import { ModalLayout } from '@/components/modal';
import { Box, Button, Stack, Typography } from '@mui/material';
import { RoomCalendar } from '../room';
import { ModalContext } from '../room/RoomReservationMobile';
import { useContext } from 'react';

export const ReservationModal = () => {
    const { openReservationModal, setOpenReservationModal, orders, price, nights } = useContext(ModalContext);

    const bodyContent = <RoomCalendar orders={orders} />
    const footerContent = (
        <Box>
            <Box padding={'14px 0'}>
                <Box>
                    <Typography component={'span'} fontWeight={600} fontSize={16}>${price}</Typography>
                    <Typography component={'span'}> / đêm</Typography>
                </Box>

                <Box>
                    <Stack direction={'row'} justifyContent={'space-between'} margin={'16px 0'}>
                        <Typography>{price} x {nights} đêm </Typography>
                        <Typography>${price * nights} </Typography>
                    </Stack>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '14px 0' }}>
                    <Button
                        variant="contained"
                        size='medium'
                        onClick={() => setOpenReservationModal(false)}
                        sx={{
                            backgroundColor: '#000000 !important',
                            width: '30%',
                            borderRadius: '8px'
                        }}>
                        Lưu
                    </Button>
                </Box>
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
