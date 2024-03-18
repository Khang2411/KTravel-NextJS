'use client'
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'
import { PriceForm } from "@/components/become-host";

const Page = ({ params }: { params: { slug: string } }) => {
    const router = useRouter()

    async function handleSubmit(payload: any) {
        console.log(payload)
        // router.push(`/host/${params.slug}/discount`)
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
                    <PriceForm onSubmit={handleSubmit} />
                </Box>
            </Box>
        </Box>

    );
}


export default Page;