import { CategoryList } from '@/components/category'
import { RoomList } from '@/components/room'
import { Box } from '@mui/material'

const getRoomList = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms`, { next: { revalidate: 500 } })
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
    <Box component={'section'} sx={{ paddingInline: { md: "80px", sm: "40px", xs: "24px" }, margin: "16px 0" }}>
      <Box sx={{ paddingInline: { md: '80px', sm: '40px', xs: '24px', padding: '20px 0' } }}>
        <CategoryList categories={categories.data}></CategoryList>
      </Box>
      <RoomList rooms={rooms.data}></RoomList>
    </Box>
  )
}
