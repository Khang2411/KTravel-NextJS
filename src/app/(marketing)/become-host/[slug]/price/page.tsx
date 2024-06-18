'use client'
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'
import { PriceForm } from "@/components/become-host";
import { useRoomList } from "@/hook";

const Page = ({ params }: { params: { slug: number } }) => {
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })

    async function handleSubmit(payload: { price: number }) {
        console.log(payload)
        const data = {
            id: params.slug,
            price: Number((Number(payload.price) + Number(payload.price) * 0.2).toFixed(0))
        }

        try {
            const room = await updateRoom(data)
            router.push(`/become-host/${params.slug}/discount`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>
                        Bây giờ, hãy đặt mức giá mà bạn muốn
                    </Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Bạn có thể thay đổi giá này bất cứ lúc nào.
                    </Typography>
                </Box>
                <Box>
                    <PriceForm onSubmit={handleSubmit} id={params.slug} />
                </Box>
            </Box>
        </Box>
    );
}

export default Page;