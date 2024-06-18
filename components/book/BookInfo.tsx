'use client'
import { useAuth } from '@/hook';
import { Room } from '@/models';
import { Box, Button, Divider, List, ListItem, Stack, Typography } from '@mui/material';
import { isMatch } from 'date-fns';
import Image from 'next/image';
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from 'react';
import { LoginModal } from '../modal';
import { ModalContext } from '../common/header/UserMenu';

type BookInfoProps = {
    room: Room
    roomId: number
}

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
export const BookInfo = ({ room, roomId }: BookInfoProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isLoggedIn, profile } = useAuth()
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

    if (!searchParams.get('check_in') || !searchParams.get('check_out')) {
        router.push(`/room/${roomId}`)
    }

    if (searchParams.get('check_in') === searchParams.get('check_out')) {
        router.push(`/room/${roomId}`)
    }

    if (Number(searchParams.get('adult')) > room.adult || Number(searchParams.get('child')) > room.child) {
        router.push(`/room/${roomId}`)
    }

    if (Number(searchParams.get('adult')) < 1 || Number(searchParams.get('child')) < 0) {
        router.push(`/room/${roomId}`)
    }

    if (isMatch(searchParams.get('check_in') as string, 'yyyy/MM/dd') === false || isMatch(searchParams.get('check_out') as string, 'yyyy/MM/dd') === false) {
        router.push(`/room/${roomId}`)
    }

    const handleBookRoom = async () => {
        if (!isLoggedIn) {
            setOpenLoginModal(!openLoginModal)
        } else if (profile?.data.verify_account !== 1) {
            router.push('/verify-account')
        }
        else {

            const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
            const data = {
                'user_id': profile?.data.id,
                'user_name': profile?.data.name,
                'check_in': current.get('check_in'),
                'check_out': current.get('check_out'),
                'adult': current.get('adult') ? current.get('adult') : 1,
                'child': current.get('child') ? current.get('child') : 0,
                'nights': nights,
                'price': room.price,
                'listing_id': roomId,
                'host_id': room.user.id
            }

            try {
                const res = await fetch(`/api/v1/checkout/paypal`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                const checkout = await res.json();
                // console.log(checkout);
                router.push(checkout.redirect)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            <Box>
                <Box>
                    <Box paddingBottom={'24px'}>
                        <Typography variant='h5'>Chuyến đi của bạn</Typography>
                    </Box>
                    <Box>
                        <Stack direction={'row'} justifyContent={'space-between'} mb={2}>
                            <Box>
                                <Typography variant='h6'>Ngày</Typography>
                                <Box>{(searchParams.get('check_in') as string)?.split("/").reverse().join("/")} - {(searchParams.get('check_out') as string)?.split("/").reverse().join("/")}</Box>
                            </Box>
                            {/* <Box>
                                <Button>Chỉnh sửa</Button>
                            </Box> */}
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant='h6'>Khách</Typography>
                                <Box>{(searchParams.get('adult') as string)} khách</Box>
                            </Box>
                            {/* <Box>
                                <Button>Chỉnh sửa</Button>
                            </Box> */}
                        </Stack>
                    </Box>
                </Box>

                <Box padding={'24px 0'}>
                    <Divider />
                </Box>

                <Box>
                    <Box>
                        <Typography variant='h5'>Thanh toán bằng</Typography>
                    </Box>
                    <Box mt={2}>
                        <Image
                            src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/26_Grey_PayPal_Pill_Button.png"
                            alt="PayPal"
                            width={100}
                            height={30}
                        />
                    </Box>
                </Box>

                <Box padding={'24px 0'}>
                    <Divider />
                </Box>

                <Box>
                    <Box>
                        <Typography variant='h5'>Chính sách hủy</Typography>
                    </Box>
                    <Box paddingTop={'24px'}>
                        Bạn được hoàn tiền một phần nếu hủy trước 13 thg 10. Sau ngày đó, bạn không được hoàn tiền cho đặt phòng này.
                    </Box>
                </Box>

                <Box padding={'24px 0'}>
                    <Divider />
                </Box>

                <Box>
                    <Box>
                        <Typography variant='h5'>Quy chuẩn chung</Typography>
                    </Box>
                    <Box paddingTop={'24px'}>
                        <Box>Chúng tôi yêu cầu tất cả khách phải ghi nhớ một số quy chuẩn đơn giản để làm một vị khách tuyệt vời.</Box>
                        <List sx={{ listStyleType: 'disc', pl: 2 }}>
                            <ListItem sx={{ display: 'list-item' }}>Tuân thủ nội quy nhà</ListItem>
                            <ListItem sx={{ display: 'list-item' }}>Giữ gìn ngôi nhà như thể đó là nhà bạn</ListItem>
                        </List>
                    </Box>
                </Box>
                <Box paddingBlockEnd={'32px'}>
                    <Button onClick={() => handleBookRoom()}
                        variant="contained"
                        size='large'
                        sx={{
                            backgroundColor: 'rgb(229,29,83) !important',
                            width: '30%',
                            margin: '15px 0'
                        }}>
                        Đặt phòng
                    </Button>
                </Box>
            </Box>

            <ModalContext.Provider value={{ openLoginModal, setOpenLoginModal, openRegModal, setOpenRegModal }}>
                <LoginModal />
            </ModalContext.Provider>
        </>
    )
}
