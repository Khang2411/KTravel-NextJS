'use client'
import { Room } from '@/models';
import { Box, Card, CardActionArea, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import React from 'react';

type BookCardProps = {
    room: Room
}

export const BookCard = ({ room }: BookCardProps) => {
    const searchParams = useSearchParams()
    const [nights, setNights] = React.useState<number>(1)

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
    
    return (
        <>
            <Card sx={{ maxWidth: '100%' }}>
                <CardActionArea>
                    <CardMedia>
                        <Stack direction={'row'} justifyContent={'space-between'} padding={'15px'} gap={3}>
                            <Box borderRadius={'18px'}>
                                <Image
                                    src={room.images[0].image}
                                    alt=""
                                    width={180}
                                    height={180}
                                    style={{ borderRadius: '8px' }}
                                />
                            </Box>
                            <Box>
                                <Box><Typography>{room.name}</Typography></Box>
                                <Box>{room.host_name}</Box>
                            </Box>
                        </Stack>
                    </CardMedia>


                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Chi tiết giá
                        </Typography>
                        <Divider />
                        <Stack direction={'row'} justifyContent={'space-between'} margin={'16px 0'}>
                            <Typography>${room.price} x {nights} đêm </Typography>
                            <Typography>${room.price * nights} </Typography>
                        </Stack>
                        {/* <Stack direction={'row'} justifyContent={'space-between'} margin={'16px 0'}>
                            <Typography>Ưu đãi đặc biệt</Typography>
                            <Typography>-$301 </Typography>
                        </Stack> */}
                        <Divider />
                        <Stack direction={'row'} justifyContent={'space-between'} marginBlockStart={'16px'}>
                            <Typography color={'rgb(34, 34, 34)'} fontSize={'1.2rem'}>Tổng</Typography>
                            <Typography>${room.price * nights}</Typography>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}