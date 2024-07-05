'use client'
import { Box, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import { PriceForm } from "./form";
import { useRoomList } from "@/hook";
import { toast } from "react-toastify";
import mutateManage from "./mutateManage";

type PriceProps = {
    price: number | undefined,
    id: number
    edit?: boolean
}

export const Price = ({ price, id, edit = true }: PriceProps) => {
    const [toggle, setToggle] = useState(false)
    const { updateRoom } = useRoomList({ enable: false })

    const handleSubmit = async (payload: { price: string }) => {
        console.log(payload)
        const data = {
            id: id,
            price: Number(payload.price),
        }
        const room = await updateRoom(data)
        setToggle(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    return (
        <>
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
                                    <Box>Giá cơ sở: ${price} </Box>
                                </Box>
                                <Box>
                                   {edit && <Button variant="text" onClick={() => setToggle(!toggle)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>} 
                                </Box>
                            </Stack>
                        </Box> :
                        <Box>
                            <PriceForm price={price} onSubmit={handleSubmit} handleToggle={() => setToggle(!toggle)}></PriceForm>
                        </Box>
                    }
                </Box>
            </Box>

        </>

    );
}

