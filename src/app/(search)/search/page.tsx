import { CategoryList } from '@/components/category'
import { RoomSearchList } from '@/components/room'
import { Box } from '@mui/material'
import { cookies } from 'next/headers'
import fetch from 'node-fetch';

const getRoomSearchList = async (searchParams: string) => {
    {/* @ts-ignore */}
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search?limit=12&${searchParams}`, {
    headers: {
      'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
    },
  })
  return res.json();
}

const getCategoryList = async () => {
    {/* @ts-ignore */}
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
  const rooms = await getRoomSearchList(search)

  return (
    <Box component={'section'} maxWidth={'1360px'} width={'100%'} margin={'auto'}>
      <Box sx={{ padding: '20px 0' }}>
        {/* @ts-ignore */}
        <CategoryList categories={categories.data}></CategoryList>
      </Box>

      <Box padding={'12px'}>
        {/* @ts-ignore */}
        <RoomSearchList rooms={rooms.data}></RoomSearchList>
      </Box>
    </Box>
  )
}
