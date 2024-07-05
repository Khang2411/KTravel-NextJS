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

export default function AccountLayout({
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
            <Box component={'footer'} paddingBottom={{ xs: '90px', md: '0' }}>
                <Footer></Footer>
            </Box>
        </>
    )
}