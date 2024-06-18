'use client'
import { Category, Privacy } from "@/models";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useState } from "react";
import { FloorPlanForm } from "./form/FloorPlanForm";
import { useCategoryList, usePrivacyList, useRoomList } from "@/hook";
import { toast } from "react-toastify";
import { StructureForm } from "./form/StructureForm";
import { PrivacyTypeForm } from "./form/PrivacyTypeForm";
import mutateManage from "./mutateManage";

type PropertyRoomsProps = {
    category: Category | undefined
    privacy: Privacy | undefined
    adult: number | undefined
    child: number | undefined
    bedroom: number | undefined
    bathroom: number | undefined
    id: number
    edit?: boolean
}

export const PropertyRooms = ({ privacy, category, adult, child, bedroom, bathroom, id, edit = true }: PropertyRoomsProps) => {
    const [toggle, setToggle] = useState(false)
    const [toggleCategory, setToggleCategory] = useState(false)
    const [togglePrivacy, setTogglePrivacy] = useState(false)
    const { data: privacyList } = usePrivacyList({})
    const { data: categoryList } = useCategoryList({})
    const { updateRoom } = useRoomList({ enable: false })

    const handleFloorPlanSubmit = async (payload: any) => {
        console.log(payload)
        const data = {
            id: id,
            adult: Number(payload.adult),
            child: Number(payload.child),
            bedroom: Number(payload.bedroom),
            bathroom: Number(payload.bathroom)
        }
        const room = await updateRoom(data)
        setToggle(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    const handleStructureSubmit = async (payload: { category_id: string }) => {
        console.log(payload)
        const data = {
            id: id,
            category_id: payload.category_id,
        }
        const room = await updateRoom(data)
        setToggleCategory(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    const handlePrivacySubmit = async (payload: { privacy_type: string }) => {
        console.log(payload)
        const data = {
            id: id,
            privacy_id: payload.privacy_type,
        }
        const room = await updateRoom(data)
        setTogglePrivacy(false)
        mutateManage()
        toast.success('Cập nhật thành công', { autoClose: 1000 });
    }

    return (
        <Box id='property-rooms' sx={{ '&>div': { paddingBlock: '18px' } }}>
            <Box>
                <Typography fontSize={'1.25rem'} fontWeight={600}>Chỗ ở và phòng</Typography>
            </Box>

            <Box sx={{ '& > div': { marginBottom: '24px' } }}>
                {toggleCategory !== true ? <Box>
                    <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box><Typography fontWeight={600}>Loại chỗ ở</Typography></Box>
                            <Box>{category?.name}</Box>
                        </Box>
                        <Box>
                            {edit && <Button variant="text" onClick={() => setToggleCategory(!toggleCategory)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                        </Box>
                    </Stack>
                </Box> : <StructureForm data={categoryList?.data} handleToggle={() => setToggleCategory(!toggleCategory)} onSubmit={handleStructureSubmit} />}

                {togglePrivacy !== true ? <Box>
                    <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                        <Box>
                            <Box mb={2}><Typography fontWeight={600}>Loại hình cho thuê</Typography>{privacy?.name}</Box>
                        </Box>
                        <Box>
                            {edit && <Button variant="text" onClick={() => setTogglePrivacy(!togglePrivacy)}>Chỉnh sửa</Button>}
                        </Box>
                    </Stack>
                </Box> : <PrivacyTypeForm data={privacyList?.data} handleToggle={() => setTogglePrivacy(!togglePrivacy)} onSubmit={handlePrivacySubmit} />}

                {toggle !== true ?
                    <Box>
                        <Stack direction={'row'} gap={8} justifyContent={'space-between'}>
                            <Box>
                                <Box mb={2}><Typography fontWeight={600}>Thông tin chỗ ở</Typography></Box>
                                <Box mb={2}>Phòng ngủ: {bedroom}</Box>
                                <Box mb={2}>Phòng tắm: {bathroom}</Box>
                                <Box mb={2}>Người lớn: {adult}</Box>
                                <Box mb={2}>Trẻ em: {child}</Box>
                            </Box>
                            <Box>
                                {edit && <Button variant="text" onClick={() => setToggle(!toggle)} sx={{ textWrap: 'nowrap' }}>Chỉnh sửa</Button>}
                            </Box>
                        </Stack>
                    </Box> : <Box><FloorPlanForm bedroom={bedroom} bathroom={bathroom} adult={adult} child={child} onSubmit={handleFloorPlanSubmit} handleToggle={() => setToggle(!toggle)} /></Box>}
            </Box>
        </Box>
    );
}


