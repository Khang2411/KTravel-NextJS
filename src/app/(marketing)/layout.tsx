'use client'
import { NavbarBecomeHost } from "@/components/common"
import { Box } from "@mui/material"

const headerStyles = {
    position: 'sticky',
    top: '0',
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
                <NavbarBecomeHost></NavbarBecomeHost>
            </Box>
            <Box component={'main'}>
                {children}
            </Box>
        </>
    )
}