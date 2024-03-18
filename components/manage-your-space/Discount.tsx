import { Box, Typography, Stack, Button } from "@mui/material";
import { MonthlyDiscountForm, NewListingDiscount, WeeklyDiscountForm } from "./form";
import { useState } from "react";

const handleNewListingsSubmit = (payload: any) => {
    console.log(payload)
}
export const Discount = () => {
    const [toggleMonthly, setToggleMonthly] = useState(false)
    const [toggleWeekly, setToggleWeekly] = useState(false)
    const [toggleNewListing, setToggleNewListing] = useState(false)

    return (
        <Box id='discount' sx={{ '&>div': { paddingBlock: '18px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Giảm giá</Typography>
            </Box>

            <Box sx={{ '& > div': { marginBottom: '24px' } }}>
                <Box>
                    {toggleWeekly !== true ? <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Giảm giá theo tuần</Box>
                            <Box>10%</Box>
                        </Box>
                        <Box>
                            <Button variant="text" onClick={() => setToggleWeekly(!toggleWeekly)} >Chỉnh sửa</Button>
                        </Box>
                    </Stack> :
                        <Box>
                            <WeeklyDiscountForm handleToggle={() => setToggleWeekly(!toggleWeekly)}></WeeklyDiscountForm>
                        </Box>
                    }

                </Box>

                <Box>
                    {toggleMonthly !== true ?
                        <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                            <Box>
                                <Box>Giảm giá theo tháng</Box>
                                <Box>15%</Box>
                            </Box>
                            <Box>
                                <Button variant="text" onClick={() => setToggleMonthly(!toggleMonthly)}>Chỉnh sửa</Button>
                            </Box>
                        </Stack> :
                        <Box>
                            <MonthlyDiscountForm handleToggle={() => setToggleMonthly(!toggleMonthly)}></MonthlyDiscountForm>
                        </Box>
                    }
                </Box>

                <Box>
                    {toggleNewListing !== true ? <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Giảm giá cho khách đặt sớm</Box>
                            <Box>20%</Box>
                        </Box>
                        <Box>
                            <Button variant="text" onClick={() => setToggleNewListing(!toggleNewListing)}>Chỉnh sửa</Button>
                        </Box>
                    </Stack> :
                        <NewListingDiscount onSubmit={handleNewListingsSubmit} handleToggle={() => setToggleNewListing(!toggleNewListing)}></NewListingDiscount>
                    }
                </Box>
            </Box>
        </Box>
    );
}

