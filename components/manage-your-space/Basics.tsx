'use client'
import { useRoomList } from "@/hook";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { TitleForm } from "./form/TitleForm";
import mutateManage from "./mutateManage";
import { DescriptionForm } from "./form/DescriptionForm";

type BasicsProps = {
    title: string | undefined,
    description: string | undefined,
    id: number,
    edit?: boolean
}
export const Basics = ({ title, description, id, edit = true }: BasicsProps) => {
    const [toggleTitle, setToggleTitle] = useState(false)
    const { updateRoom } = useRoomList({ enable: false })
    const [toggleDescription, setToggleDescription] = useState(false)

    const handleTitleSubmit = async (payload: { title: string }) => {
        console.log(payload)
        const data = {
            id: id,
            name: payload.title
        }
        const room = await updateRoom(data)
        setToggleTitle(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    const handleDescriptionSubmit = async (payload: { description: string }) => {
        console.log(payload)
        const data = {
            id: id,
            description: payload.description
        }
        const room = await updateRoom(data)
        setToggleDescription(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    return (
        <Box id="basics" sx={{ '&>div': { paddingBlock: '24px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Thông tin cơ bản về nhà/phòng cho thuê</Typography>
            </Box>

            {toggleTitle !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Tiêu đề nhà/phòng cho thuê</Typography>
                        <Box>{title}</Box>
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setToggleTitle(!toggleTitle)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <TitleForm title={title!} onSubmit={handleTitleSubmit} handleToggle={() => setToggleTitle(!toggleTitle)} />}
            <Divider />

            {toggleDescription !== true ? <Box>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Mô tả nhà/phòng cho thuê</Typography>
                        <Box dangerouslySetInnerHTML={{ __html: description?.substring(0, 500) + "..." || "" }}></Box>
                    </Box>
                    <Box>
                        {edit && <Button variant="text" onClick={() => setToggleDescription(!toggleDescription)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                    </Box>
                </Stack>
            </Box> : <DescriptionForm description={description!} onSubmit={handleDescriptionSubmit} handleToggle={() => setToggleDescription(!toggleDescription)} />}

            <Divider />
        </Box>
    );
}


