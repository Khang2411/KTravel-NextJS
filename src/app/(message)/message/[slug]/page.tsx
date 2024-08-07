import { Chat } from '@/components/chat'
import { Box } from '@mui/material'
import { cookies } from 'next/headers'
import React from 'react'


const getUserList = async (): Promise<any> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/broadcast/user/message/list`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
        },
    })
    return res.json();
}

const getMess = async (messId: number | string): Promise<any> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/broadcast/message/${messId}`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('accessToken')?.value}`,
        },
    })
    return res.json();
}

export default async function Page({ params }: { params: { slug: number } }) {
    const userList = await getUserList()
    const mess = await getMess(params.slug)

    return (
        <>
            <Box component={'section'} sx={{ maxWidth: '1400px', width: '100%', paddingInline: { md: "80px", sm: "40px", xs: "24px" }, margin: "16px 0" }}>
                <Chat userList={userList.data} messId={params.slug} message={mess.data} />
            </Box>
        </>
    )
}