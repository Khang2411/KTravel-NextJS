'use client'
import { DiscountForm } from "@/components/become-host";
import { useRoomList } from "@/hook";
import { DiscountPayload } from "@/models";
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'

const listData = [
    {
        name: 'newListingDiscount',
        title: 'Khuyến mãi cho nhà/phòng cho thuê mới',
        description: 'Giảm giá 20% cho 3 lượt đặt phòng đầu tiên của bạn',
        defaultPercent: '20'
    },
    {
        name: 'weeklyDiscount',
        title: 'Giảm giá theo tuần',
        description: 'Dành cho thời gian ở từ 7 đêm trở lên',
        defaultPercent: '10'
    },
    {
        name: 'monthlyDiscount',
        title: 'Giảm giá theo tháng',
        description: 'Dành cho thời gian ở từ 28 đêm trở lên',
        defaultPercent: '15',
    }
]

const Page = ({ params }: { params: { slug: number } }) => {
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })

    const handleSubmit = async (payload: Partial<DiscountPayload>) => {
        if (payload.monthlyDiscountInput && payload.monthlyDiscount !== '0') {
            payload.monthlyDiscount = payload.monthlyDiscountInput
        } else {
            payload.monthlyDiscount = '0'
        }


        if (payload.weeklyDiscountInput && payload.weeklyDiscount !== '0') {
            payload.weeklyDiscount = payload.weeklyDiscountInput
        } else {
            payload.weeklyDiscount = '0'
        }
        //  console.log(payload)
        const data = {
            id: params.slug,
            monthly_discount: Number(payload.monthlyDiscount),
            weekly_discount: Number(payload.weeklyDiscount),
            new_discount: Number(payload.newListingDiscount)
        }
        try {
            const room = await updateRoom(data)
            router.push(`/become-host/${params.slug}/receipt`);

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box margin={'20px 0'}>
                    <Box marginBottom={'32px'}>
                        <Typography fontSize={30} fontWeight={600}>
                            Thêm ưu đãi giảm giá
                        </Typography>
                        <Typography fontSize={18} color={'#717171'}>
                            Giúp chỗ ở của bạn trở nên nổi bật để nhanh chóng được đặt phòng và thu hút những bài đánh giá đầu tiên.
                        </Typography>
                    </Box>

                    <Box>
                        <DiscountForm onSubmit={handleSubmit} data={listData} id={params.slug} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Page;