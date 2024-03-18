'use client'
import { HeaderManage } from "@/components/common/header/HeaderManage"
import { Box } from "@mui/material"

const headerStyles = {
    position: 'relative',
    zIndex: '999',
    backgroundColor: '#ffff',
    paddingBlock: '12px',
    boxShadow: 'rgb(235, 235, 235) 0px 1px 0px'
}

export default function HostLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Box component={'header'} sx={headerStyles}>
                <HeaderManage></HeaderManage>
            </Box>
            <Box component={'main'}>
                {children}
            </Box>
        </>
    )
}