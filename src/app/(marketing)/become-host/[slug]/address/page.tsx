'use client'
import { AddressForm } from '@/components/become-host';
import { useRoomList } from '@/hook';
import { useAddress } from '@/hook/use-address';
import { Address, Room } from '@/models';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: { slug: number } }) {
    const { updateRoomAddress } = useRoomList({ enable: false })
    const router = useRouter()
    const { data: countryList } = useAddress({})

    console.log(countryList)

    const handleAddressSubmit = async (payload: Address) => {
        //console.log(payload)
        const data = {
            id: params.slug,
            country: payload.country,
            street: payload.street,
            city: payload.city,
            state: payload.state
        }
        try {
            const room = await updateRoomAddress(data as Address)
            router.push(`/become-host/${params.slug}/floor-plan`);
        } catch (err) {
            console.log(err);
        }

    }
    return (

        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Xác nhận địa chỉ của bạn?</Typography>
                </Box>

                <Box>
                    <AddressForm countries={countryList} onSubmit={handleAddressSubmit} id={params.slug} />
                </Box>
            </Box>
        </Box>
    )
}
