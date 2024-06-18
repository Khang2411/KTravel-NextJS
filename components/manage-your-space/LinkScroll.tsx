'use client'
import { Box, List, Typography, ListItem } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-scroll'
import { useRouter } from 'next/navigation'
import { Room } from '@/models'

const dataList = [
    {
        id: 'images',
        name: 'Ảnh'
    },
    {
        id: 'basics',
        name: 'Thông tin cơ bản về nhà/phòng cho thuê'
    },
    {
        id: 'amenities',
        name: 'Tiện nghi'
    },
    {
        id: 'location',
        name: 'Vị trí'
    },
    {
        id: 'property-rooms',
        name: 'Chỗ ở và phòng'
    },
    {
        id: 'price',
        name: 'Định giá'
    },
    {
        id: 'discount',
        name: 'Giảm giá'
    },
]
type LinkScrollProps = {
    room: Room
}

export const LinkScroll = ({ room }: LinkScrollProps) => {
    const router = useRouter()
    console.log(room)
    useEffect(() => {
        if (!room.category_id) {
            router.push(`/become-host/${room.id}/structure`)
        } else if (!room.privacy_id) {
            router.push(`/become-host/${room.id}/privacy-type`)
        } else if (room.amenities.length === 0) {
            router.push(`/become-host/${room.id}/amenities`)
        } else if (!room.latitude || !room.longitude) {
            router.push(`/become-host/${room.id}/location`)
        } else if (!room.address) {
            router.push(`/become-host/${room.id}/address`)
        } else if (!room.adult || !room.child || !room.bathroom || !room.bedroom) {
            router.push(`/become-host/${room.id}/floor-plan`)
        } else if (room.images.length === 0) {
            router.push(`/become-host/${room.id}/photos`)
        } else if (!room.name) {
            router.push(`/become-host/${room.id}/title`)
        } else if (!room.description) {
            router.push(`/become-host/${room.id}/description`)
        } else if (!room.price) {
            router.push(`/become-host/${room.id}/price`)
        } else if (!room.status) {
            router.push(`/become-host/${room.id}/receipt`)
        }
    })
    return (
        <Box width={{ xs: '100%', position: 'sticky', top: '10px' }}>
            <List sx={{ display: { xs: 'flex', md: 'block' } }} >
                <Box><Typography fontWeight={'600'}>{room.name}</Typography></Box>
                {dataList.map((item, index) =>
                    <ListItem alignItems="flex-start" key={index}>
                        <Link activeClass="active" smooth spy to={item.id}>
                            <Typography sx={{ cursor: 'pointer' }}>{item.name}</Typography>
                        </Link>
                    </ListItem>
                )}
            </List>
        </Box>
    )
}
