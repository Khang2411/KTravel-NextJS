import { CategoryList } from '@/components/category'
import { RoomList } from '@/components/room'
import { Box } from '@mui/material'
import { cookies } from 'next/headers'
import fetch from 'node-fetch';

const getRoomList = async (searchParams: string) => {
  {/* @ts-ignore  */}
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms?limit=12&${searchParams}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
    },
  })
  return res.json();
}

const getCategoryList = async () => {
  {/* @ts-ignore  */}
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`)
  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[][] | Record<string, string> | URLSearchParams | undefined };
}) {
  const search = new URLSearchParams(searchParams as URLSearchParams | undefined).toString();
  const categories = await getCategoryList()
  const rooms = await getRoomList(search)
  return (
    <Box component={'section'} maxWidth={'1360px'} width={'100%'} margin={'auto'}>
      <Box sx={{ padding: '20px 0' }}>
        <CategoryList categories={categories.data}></CategoryList>
      </Box>
      <Box padding={'12px'}>
        <RoomList rooms={rooms.data}></RoomList>
      </Box>
    </Box>
  )
}
