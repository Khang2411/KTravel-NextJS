import { CategoryList } from '@/components/category'
import { RoomList } from '@/components/room'
import { Box, Typography } from '@mui/material'
import { cookies } from 'next/headers'

const getCategoryList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`, { next: { revalidate: 3600 } })
  return res.json();
}

export default async function Page() {
  const categories = await getCategoryList()

  return (
    <Box component={'section'} maxWidth={'1360px'} width={'100%'} margin={'auto'}>
      <Box sx={{ padding: '20px 0' }}>
        <CategoryList categories={categories.data}></CategoryList>
      </Box>
    </Box>
  )
}
