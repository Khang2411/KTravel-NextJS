'use client'
import { Box, Typography, Stack, Button } from "@mui/material";
import { MonthlyDiscountForm, NewListingDiscount, WeeklyDiscountForm } from "./form";
import { useState } from "react";
import { useRoomList } from "@/hook";
import { toast } from "react-toastify";
import mutateManage from "./mutateManage";


type DiscountProps = {
    weekly_discount: number | undefined,
    monthly_discount: number | undefined,
    new_discount: number | undefined,
    id: number
    edit?: boolean
}

export const Discount = ({ weekly_discount, monthly_discount, new_discount, id, edit = true }: DiscountProps) => {
    const [toggleMonthly, setToggleMonthly] = useState(false)
    const [toggleWeekly, setToggleWeekly] = useState(false)
    const [toggleNewListing, setToggleNewListing] = useState(false)
    const { updateRoom } = useRoomList({ enable: false })

    const handleNewListingsSubmit = async (payload: { new_discount: string }) => {
        const data = {
            id: id,
            new_discount: Number(payload.new_discount),
        }
        const room = await updateRoom(data)
        setToggleNewListing(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    const handleMonthlySubmit = async (payload: { monthly_discount: string }) => {
        console.log(payload)
        const data = {
            id: id,
            monthly_discount: Number(payload.monthly_discount),
        }
        const room = await updateRoom(data)
        setToggleMonthly(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    const handleWeeklySubmit = async (payload: { weekly_discount: string }) => {
        const data = {
            id: id,
            weekly_discount: Number(payload.weekly_discount),
        }
        const room = await updateRoom(data)
        setToggleWeekly(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

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
                            <Box>{weekly_discount ? weekly_discount + '%' : 'Không có'}</Box>
                        </Box>
                        <Box>
                            {edit && <Button variant="text" onClick={() => setToggleWeekly(!toggleWeekly)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                        </Box>
                    </Stack> :
                        <Box>
                            <WeeklyDiscountForm onSubmit={handleWeeklySubmit} weekly_discount={weekly_discount} monthly_discount={monthly_discount} handleToggle={() => setToggleWeekly(!toggleWeekly)}></WeeklyDiscountForm>
                        </Box>
                    }
                </Box>
                <Box>
                    {toggleMonthly !== true ?
                        <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                            <Box>
                                <Box>Giảm giá theo tháng</Box>
                                <Box>{monthly_discount ? monthly_discount + '%' : 'Không có'}</Box>
                            </Box>
                            <Box>
                                {edit && <Button variant="text" onClick={() => setToggleMonthly(!toggleMonthly)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                            </Box>
                        </Stack> :
                        <Box>
                            <MonthlyDiscountForm onSubmit={handleMonthlySubmit} monthly_discount={monthly_discount} weekly_discount={weekly_discount} handleToggle={() => setToggleMonthly(!toggleMonthly)}></MonthlyDiscountForm>
                        </Box>
                    }
                </Box>

                <Box>
                    {toggleNewListing !== true ? <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Giảm giá cho khách đặt sớm</Box>
                            <Box>{new_discount ? new_discount + '%' : 'Không có'}</Box>
                        </Box>
                        <Box>
                            {edit && <Button variant="text" onClick={() => setToggleNewListing(!toggleNewListing)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                        </Box>
                    </Stack> :
                        <NewListingDiscount new_discount={new_discount} onSubmit={handleNewListingsSubmit} handleToggle={() => setToggleNewListing(!toggleNewListing)}></NewListingDiscount>
                    }
                </Box>
            </Box>
        </Box>
    );
}

