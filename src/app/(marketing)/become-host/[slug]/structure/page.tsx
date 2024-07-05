'use client'
import { StructureForm } from "@/components/become-host";
import { useAuth, useRoomList } from "@/hook";
import { useCategoryList } from "@/hook/use-category-list";
import { Room } from "@/models";
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'

const Page = ({ params }: { params: { slug: number } }) => {
    const { data: categoryList } = useCategoryList({})
    const { updateRoom } = useRoomList({ enable: false })
    const router = useRouter()
    const { profile } = useAuth({})

    const handleStructureSubmit = async (payload: Partial<Room>) => {
        const data = {
            id: params.slug,
            category_id: payload.category_id,
            host_name: profile?.data.name
        }

        try {
            const room = await updateRoom(data as Room)
            router.push(`/become-host/${params.slug}/privacy-type`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' }, height: 'calc(100vh - 170px)' }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Khách sẽ được sử dụng loại chỗ ở nào?</Typography>
                </Box>

                <Box>
                    <StructureForm data={categoryList?.data} onSubmit={handleStructureSubmit}></StructureForm>
                </Box>
            </Box>
        </Box>
    )
}

export default Page;