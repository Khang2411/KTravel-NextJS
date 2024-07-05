import { Footer } from "@/components/common"
import { HeaderDesktop, HeaderRoomMobile } from "@/components/common/header"
import { Box } from "@mui/material"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Box component={'header'}>
                <Box>
                    <HeaderDesktop />
                    <HeaderRoomMobile />
                </Box>
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