'use client'
import { Box, Stack, Button, CircularProgress } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    progressInput: number,
    disabled: boolean,
    backTo: string
}
export const FooterBecomeHost = ({ progressInput, disabled, backTo }: Props) => {
    const [progress, setProgress] = useState(progressInput);

    useEffect(() => {
        setProgress((oldProgress) => {
            if (oldProgress === 100) {
                return 100;
            }
            return Math.min(progressInput, 100);
        });
    }, [progressInput]);

    return (
        <Box className="footer-become-host" sx={{ position: 'fixed', left: 0, bottom: 0, width: '100%', zIndex: 999, backgroundColor: '#ffff' }}>
            <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progress} sx={{ backgroundColor: '#DDDDDD' }} />
            </Box>
            <Box sx={{ padding: "16px" }}>
                <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
                    <Box>
                        <Link href={backTo}>
                            <Button
                                variant="text"
                                sx={{
                                    color: '#222222',
                                    '&:hover': {
                                        backgroundColor: '#F7F7F7'
                                    }
                                }}>
                                Quay lại
                            </Button>
                        </Link>
                    </Box>
                    <Box>
                        <Button
                            variant="outlined"
                            type="submit"
                            disabled={disabled}
                            startIcon={disabled ? <CircularProgress color="inherit" size="1em" /> : null}
                            sx={{
                                fontWeight: '600',
                                borderRadius: '12px',
                                padding: '14px 32px',
                                backgroundColor: '#222222 !important',
                                color: '#ffffff'
                            }}>Tiếp theo</Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}


