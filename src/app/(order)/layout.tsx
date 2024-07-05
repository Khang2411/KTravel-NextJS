import { Footer } from "@/components/common"
import { HeaderDesktop } from "@/components/common/header"
import { Box } from "@mui/material"

const headerStyles = {
    position: 'sticky',
    top: '0',
    zIndex: '999',
    backgroundColor: '#ffff',
}

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Box component={'header'} sx={headerStyles}>
                <HeaderDesktop />
            </Box>
            <Box component={'main'}>
                {children}
            </Box>
            <Box component={'footer'}>
                <Footer></Footer>
            </Box>
        </>
    )
}