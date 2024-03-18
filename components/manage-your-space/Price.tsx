import { Box, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import { PriceForm } from "./form";

const handleSubmit = (payload: any) => {
    console.log(payload)
}

export const Price = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <Box id='price' sx={{ '&>div': { paddingBlock: '18px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Định giá</Typography>
            </Box>

            <Box sx={{ '& > div': { marginBottom: '24px' } }}>
                {toggle !== true ?
                    <Box>
                        <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                            <Box>
                                <Box>Giá theo đêm</Box>
                                <Box>Giá cơ sở: $23 </Box>
                            </Box>
                            <Box>
                                <Button variant="text" onClick={() => setToggle(!toggle)}>Chỉnh sửa</Button>
                            </Box>
                        </Stack>
                    </Box> :
                    <Box>
                        <PriceForm onSubmit={handleSubmit} handleToggle={() => setToggle(!toggle)}></PriceForm>
                    </Box>
                }
            </Box>
        </Box>
    );
}

