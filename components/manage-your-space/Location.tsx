'use client'
import { Address, Room } from "@/models";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import { AddressForm } from "./form/AddressForm";
import { useAddress } from "@/hook/use-address";
import { toast } from "react-toastify";
import { useRoomList } from "@/hook";
import mutateManage from "./mutateManage";

type LocationProps = {
    address: Address
    longitude: number
    latitude: number
    id: number
    edit?: boolean
}
export const Location = ({ address, longitude, latitude, id,edit = true }: LocationProps) => {
    const [toggle, setToggle] = useState(false)
    const { data: countryList } = useAddress({})
    const { updateRoom } = useRoomList({ enable: false })

    const handleSubmit = async (payload: Partial<Room & Address>) => {
        console.log(payload)
        const data = {
            id: id,
            latitude: payload.latitude,
            longitude: payload.longitude,
            street: payload.street,
            country: payload.country,
            city: payload.city,
            state: payload.state
        }
        const room = await updateRoom(data)
        setToggle(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }
    return (
        <Box id='location' sx={{ '&>div': { paddingBlock: '18px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Vị trí</Typography>
            </Box>

            <Box sx={{ '& > div': { marginBottom: '24px' } }}>
                {toggle !== true ? <Box>
                    <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box>Địa chỉ cụ thể</Box>
                            <Box>{address?.street} {address?.state} {address?.city} {address?.country}</Box>
                        </Box>
                        <Box>
                           {edit && <Button variant="text" onClick={() => setToggle(!toggle)} sx={{textWrap:'nowrap'}}>Chỉnh sửa</Button>} 
                        </Box>
                    </Stack>
                </Box> : <AddressForm address={address} longitude={longitude} latitude={latitude} handleToggle={() => setToggle(!toggle)} countries={countryList} onSubmit={handleSubmit} />}
            </Box>
        </Box>
    );
}
