'use client'
import { useAmenitiesList } from '@/hook/use-amenities-list';
import { ListParams } from '@/models';
import { Box, Button, Grid, Typography } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';

const Page = () => {
    const [active, setActive] = useState("");

    const filters: Partial<ListParams> = {
        page: 1,
    }

    const { data, isLoading } = useAmenitiesList({ params: filters })

    useEffect(() => {
        console.log(data)
    }, [active, data])

    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
        var { name, value } = e.currentTarget as HTMLInputElement
        setActive(value)
        // console.log(name)
        console.log(value)
    }
    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Cho khách biết chỗ ở của bạn có những gì</Typography>
                    <Typography fontSize={18} color={'#717171'}>Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê.</Typography>
                </Box>
                <Grid container spacing={2}>
                    {data.data.map((item, index) =>
                        <Grid item xs={6} sm={4} key={index} marginBottom={'12px'}>
                            <Button variant="outlined"
                                className={active == item.id ? 'active' : ''}
                                fullWidth
                                name="amenity_id"
                                value={item.id}
                                onClick={(e) => handleClick(e)}
                                sx={{
                                    height: '100%',
                                    justifyContent: 'space-between',
                                    color: '#000',
                                    padding: '24px',
                                    border: '1px solid #DDDDDD',
                                    borderRadius: '12px',
                                    ':hover': {
                                        borderColor: 'transparent',
                                        boxShadow: '0 0 0 2px #222222 !important'
                                    },
                                    '&.active': {
                                        boxShadow: '0 0 0 2px #222222 !important'
                                    },
                                }}>
                                <Box textAlign={'initial'}>
                                    <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>1</Typography>
                                    <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>{item.name}</Typography>
                                </Box>
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}

export default Page;