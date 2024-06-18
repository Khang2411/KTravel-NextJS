import { Footer } from "@/components/common"
import { HeaderDesktop, HeaderMobile } from "@/components/common/header"
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
                <HeaderMobile />
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