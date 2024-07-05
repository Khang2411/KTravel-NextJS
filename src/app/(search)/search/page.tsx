import { CategoryList } from '@/components/category'
import { RoomSearchList } from '@/components/room'
import { Box } from '@mui/material'
import { cookies } from 'next/headers'

const getRoomSearchList = async (searchParams: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search?limit=12&${searchParams}`, {
    next: { tags: ['test'] },
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

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[][] | Record<string, string> | URLSearchParams | undefined };
}) {

  const search = new URLSearchParams(searchParams as URLSearchParams | undefined).toString();
  const categories = await getCategoryList()
  const rooms = await getRoomSearchList(search)

  return (
    <Box component={'section'} maxWidth={'1360px'} width={'100%'} margin={'auto'}>
      <Box sx={{ padding: '20px 0' }}>
        <CategoryList categories={categories.data}></CategoryList>
      </Box>

      <Box padding={'12px'}>
        <RoomSearchList rooms={rooms.data}></RoomSearchList>
      </Box>
    </Box>
  )
}
