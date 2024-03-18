'use client'
import { Amenities, Basics, Discount, Location, Price, PropertyRooms } from "@/components/manage-your-space";
import { Box, Button, Divider, List, ListItem, ListItemButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-scroll/modules/index";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


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

const Page = () => {

    return (
        <Box sx={{ maxWidth: '1440px', paddingInline: { xs: '24px', md: '80px' } }}>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={8}>
                <Box width={{ xs: '100%', md: '25%' }}>
                    <List sx={{ position: 'sticky', top: '24px', display: { xs: 'flex', md: 'block' } }} >
                        <Box><Typography fontWeight={'600'}>EFGRG</Typography></Box>
                        {dataList.map((item, index) =>
                            <ListItem alignItems="flex-start" key={index}>
                                <Link activeClass="active" smooth spy to={item.id}>
                                    {item.name}
                                </Link>
                            </ListItem>
                        )}
                    </List>
                </Box>

                <Box width={{ xs: '100%', md: "70%" }}>
                    <Basics></Basics>
                    <Divider />
                    <Amenities></Amenities>
                    <Divider />
                    <Location></Location>
                    <Divider />
                    <PropertyRooms></PropertyRooms>
                    <Divider />
                    <Price></Price>
                    <Divider />
                    <Discount></Discount>
                </Box>
            </Stack >
        </Box >
    )

}
export default Page;