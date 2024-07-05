'use client'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Box, Link } from "@mui/material";
import React from 'react';

type ModalContextType = {
    openLoginMobile: boolean
    setOpenLoginMobile: (c: boolean) => void
    openRegMobile?: boolean
    setOpenRegMobile?: (c: boolean) => void
}

export const ModalContextRoomMobile = React.createContext<ModalContextType>({
    openLoginMobile: false,
    setOpenLoginMobile: () => { },
    openRegMobile: false,
    setOpenRegMobile: () => { }
})

export const HeaderRoomMobile = () => {
    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box position={'absolute'} top={'15px'} zIndex={999}>
                    <Link href={'/'}>
                        <Box ml={2} bgcolor={'#ebebeb'} width={'35px'} borderRadius={'50%'}>
                            <KeyboardArrowLeftIcon sx={{ fontSize: 35 }} />
                        </Box>
                    </Link>
                </Box>
            </Box>
        </>
    )
}

