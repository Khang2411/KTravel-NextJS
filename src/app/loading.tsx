import { Box, CircularProgress, Stack } from "@mui/material";

export default function Loading() {
    return (
        <Box>
            <Stack height={'60vh'} alignItems={'center'} justifyContent={'center'}>
                <Box>
                    <CircularProgress />
                </Box>
            </Stack>
        </Box>
    )
}