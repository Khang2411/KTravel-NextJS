import { HeaderBecomeHost } from "@/components/common"
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
                <HeaderBecomeHost></HeaderBecomeHost>
            </Box>
            <Box component={'main'} sx={{ backgroundColor: '#ffffff !important' }}>
                {children}
            </Box>
        </>
    )
}