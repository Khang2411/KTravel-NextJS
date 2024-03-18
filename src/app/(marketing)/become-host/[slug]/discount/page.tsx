'use client'
import { DiscountForm } from "@/components/become-host";
import { DiscountPayload } from "@/models";
import { Box, Typography } from "@mui/material";
import { useRouter } from 'next/navigation'

const listData = [
    {
        name: 'newListingPromotion',
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

const Page = () => {
    const router = useRouter()

    const handleSubmit = async (payload: Partial<DiscountPayload>) => {
        if (payload.monthlyDiscount[0] !== null) {
            payload.monthlyDiscount = [payload.monthlyDiscountInput]
        } if (payload.weeklyDiscount[0] !== null) {
            payload.weeklyDiscount = [payload.weeklyDiscountInput]
        }
        delete payload.weeklyDiscountInput
        delete payload.monthlyDiscountInput
        // router.push("/")
        console.log(payload)
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
                        <DiscountForm onSubmit={handleSubmit} data={listData}></DiscountForm>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Page;