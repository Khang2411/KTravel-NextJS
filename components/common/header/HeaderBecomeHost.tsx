'use client'
import { Box, Stack, Button } from "@mui/material";
import { Logo } from "./Logo";
import { useRouter } from 'next/navigation'
import mutateBecomeHost from "@/components/become-host/mutateBecomeHost";

export const HeaderBecomeHost = () => {
    const router = useRouter()

    const handleSubmit = () => {
        mutateBecomeHost()
        router.push(`/hosting/listings`);
    }

    return (
        <Box sx={{ paddingTop: "32px", paddingInline: '48px' }}>
            <Stack direction="row" justifyContent="space-between">
                <Logo></Logo>
                <Button variant="outlined" onClick={handleSubmit}
                    sx={{
                        fontWeight: '600',
                        borderRadius: '32px',
                        ':hover': {
                            border: '1px solid #222222',
                            backgroundColor: 'transparent'
                        }
                    }}>Lưu và Thoát</Button>
            </Stack>
        </Box>
    );
}


