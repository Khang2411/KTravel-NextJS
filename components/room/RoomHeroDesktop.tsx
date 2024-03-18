'use client'
import { Box, ImageList, ImageListItem } from '@mui/material'
import Image from 'next/image'

export const RoomHeroDesktop = () => {
    return (

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ImageList
                sx={{
                    width: '100%',
                    height: { sm: '45vh' },
                }}
                cols={4}
                gap={8}
            >
                <ImageListItem cols={2} rows={2} sx={{ position: 'relative' }}>
                    <Image src={'/images/travel.jpeg'} alt={""} fill style={{ objectFit: 'cover' }}></Image>
                </ImageListItem>

                <ImageListItem cols={1} rows={1} sx={{ position: 'relative' }}>
                    <Image src={'/images/travel.jpeg'} alt={""} fill style={{ objectFit: 'cover' }}></Image>
                </ImageListItem>

                <ImageListItem cols={1} rows={1} sx={{ position: 'relative' }}>
                    <Image src={'/images/travel.jpeg'} alt={""} fill style={{ objectFit: 'cover' }}></Image>
                </ImageListItem>

                <ImageListItem cols={1} rows={1} sx={{ position: 'relative' }}>
                    <Image src={'/images/travel.jpeg'} alt={""} fill style={{ objectFit: 'cover' }} ></Image>
                </ImageListItem>

                <ImageListItem cols={1} rows={1} sx={{ position: 'relative' }}>
                    <Image src={'/images/travel.jpeg'} alt={""} fill style={{ objectFit: 'cover' }} ></Image>
                </ImageListItem>
            </ImageList>
        </Box>

    )
}

