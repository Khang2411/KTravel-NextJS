'use client'
import { Box, Button, List, ListItem, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import { isMatch } from 'date-fns';
import Error from '@/components/common/Error';
import { Room } from '@/models';
import { addDays, format } from "date-fns";

type BookInfoProps = {
    room: Room
}

export const BookInfo = ({ room }: BookInfoProps) => {
    const searchParams = useSearchParams();
    if (!searchParams.get('check_in') || !searchParams.get('check_out')) {
        return <Error />
    }

    if (isMatch(searchParams.get('check_in') as string, 'yyyy/MM/dd') === false || isMatch(searchParams.get('check_out') as string, 'yyyy/MM/dd') === false) {
        return <Error />
    }
    const handleBookRoom = async () => {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        const data = {
            'check_in': current.get('check_in'),
            'check_out': current.get('check_out'),
            'adult': current.get('adult') ? current.get('adult') : 1,
            'child': current.get('child') ? current.get('child') : 0,
        }
        const res = await fetch(`/api/v1/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return res.json();
    }

    return (
        <>
            <Box>
                <Box>
                    <Box paddingBottom={'24px'}>
                        <Typography variant='h5'>Chuyến đi của bạn</Typography>
                    </Box>
                    <Box>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant='h6'>Ngày</Typography>
                                <Box>{(searchParams.get('check_in') as string).split("/").reverse().join("/")} - {(searchParams.get('check_out') as string).split("/").reverse().join("/")}</Box>
                            </Box>
                            <Box>
                                <Button>Chỉnh sửa</Button>
                            </Box>
                        </Stack>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Box>
                                <Typography variant='h6'>Khách</Typography>
                                <Box>{(searchParams.get('adult') as string)} khách</Box>
                            </Box>
                            <Box>
                                <Button>Chỉnh sửa</Button>
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                <Box paddingBlock={'32px 24px'}>
                    <Box>
                        <Typography variant='h5'>Thanh toán bằng</Typography>
                    </Box>
                    <Box>
                        <Image
                            src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/26_Grey_PayPal_Pill_Button.png"
                            alt="PayPal"
                            width={80}
                            height={30}
                        />
                    </Box>
                </Box>

                <Box paddingBlock={'32px 24px'}>
                    <Box>
                        <Typography variant='h5'>Chính sách hủy</Typography>
                    </Box>
                    <Box paddingTop={'24px'}>
                        Bạn được hoàn tiền một phần nếu hủy trước 13 thg 10. Sau ngày đó, bạn không được hoàn tiền cho đặt phòng này. Tìm hiểu thêm
                    </Box>
                </Box>

                <Box paddingBlock={'32px 24px'}>
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
                <Box>
                    <Button onClick={handleBookRoom}
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
        </>
    )
}
