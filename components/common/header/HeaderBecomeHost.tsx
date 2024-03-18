import { Box, Stack, Button } from "@mui/material";
import { Logo } from "./Logo";

export const HeaderBecomeHost = () => {
    return (
        <Box sx={{ paddingTop: "32px", paddingInline:'48px' }}>
            <Stack direction="row" justifyContent="space-between">
                <Logo></Logo>
                <Button variant="outlined"
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


