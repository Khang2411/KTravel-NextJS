'use client'
import { useAmenitiesList, useRoomList } from "@/hook";
import { Amenities, Room } from "@/models";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { AmenityForm } from "./form/AmenityForm";
import mutateManage from "./mutateManage";
import { toast } from "react-toastify";

type AmenitiesManageProps = {
    amenities: Array<Amenities> | undefined,
    id: number
    edit?: boolean
}

export const AmenitiesManage = ({ amenities, id, edit = true }: AmenitiesManageProps) => {
    const [toggle, setToggle] = useState(false)
    const { updateRoom } = useRoomList({ enable: false })
    const { data: amenityList } = useAmenitiesList({})

    const handleSubmit = async (payload: Partial<Room>) => {
        console.log(payload)
        const data = {
            id: id,
            amenities: payload.amenities
        }
        const room = await updateRoom(data)
        setToggle(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }
    return (
        <Box id='amenities' sx={{ '&>div': { paddingBlock: '24px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Tiện nghi</Typography>
            </Box>

            {toggle !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Stack
                            direction='row'
                            flexWrap='wrap'
                            sx={{
                                '& p': { paddingBottom: '16px', color: '#222222' },
                                '& > div': { flexBasis: { xs: '50%' }, margin: '5px 0' }
                            }}>

                            {amenities?.map((item, index: React.Key) =>
                                <Box key={index}>
                                    <Box dangerouslySetInnerHTML={{ __html: item.icon }} />
                                    <Typography>{item.name}</Typography>
                                </Box>)}

                        </Stack>
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setToggle(!toggle)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <AmenityForm amenities={amenityList} onSubmit={handleSubmit} handleToggle={() => setToggle(!toggle)} />}

        </Box>
    );
}


