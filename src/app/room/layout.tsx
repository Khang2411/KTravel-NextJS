import NavbarCommon from "@/components/common/header"
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
                <NavbarCommon></NavbarCommon>
            </Box>
            <Box component={'main'}>
                {children}
            </Box>
        </>
    )
}