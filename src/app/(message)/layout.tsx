'use client'
import { Footer } from "@/components/common"
import { HeaderManage, HeaderManageMobile } from "@/components/common/header"
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
                <HeaderManage />
                <HeaderManageMobile />
            </Box>
            <Box component={'main'}>
                {children}
            </Box>
            <Box component={'footer'} display={{ xs: 'none', md: 'block' }}>
                <Footer></Footer>
            </Box>
        </>
    )
}