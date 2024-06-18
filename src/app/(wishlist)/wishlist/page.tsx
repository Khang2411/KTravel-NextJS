import { CategoryList } from '@/components/category'
import { RoomList } from '@/components/room'
import { Box, Typography } from '@mui/material'
import { cookies } from 'next/headers'

const getRoomList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/wishlist?limit=12`, {
    headers: {
      'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
    },
  })
  return res.json();
}

const getCategoryList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`, { next: { revalidate: 3600 } })
  return res.json();
}

export default async function Page() {
  const categories = await getCategoryList()
  const rooms = await getRoomList()

  return (
    <Box component={'section'} maxWidth={'1360px'} width={'100%'} margin={'auto'}>
      <Box sx={{ padding: '20px 0' }}>
        <CategoryList categories={categories.data}></CategoryList>
      </Box>
      <Box padding={'12px'}>
        <Box padding={'25px 0'}><Typography variant='h4'>Yêu thích</Typography></Box>
        <RoomList rooms={rooms.data}></RoomList>
        {rooms.data.data.length === 0  && <Box><Typography padding={'10px 0'}>Không có mục yêu thích nào.</Typography></Box>}
      </Box>
    </Box>
  )
}
