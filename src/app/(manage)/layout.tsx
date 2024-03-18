'use client'
import { NavbarManage } from "@/components/common/header/HeaderManage"
import { Box } from "@mui/material"

const headerStyles = {
    position: 'relative',
    zIndex: '999',
    backgroundColor: '#ffff',
    paddingBlock: '12px'
}

export default function HostLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Box component={'header'} sx={headerStyles}>
                <NavbarManage></NavbarManage>
            </Box>
            <Box component={'main'}>
                {children}
            </Box>
        </>
    )
}