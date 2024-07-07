import axiosClient from '@/api-client/axios-client';
import { NextAuthProvider } from '@/components/common';
import '@fontsource/roboto/500.css';
import { Box } from '@mui/material';
import { Inter } from 'next/font/google';
import { SWRConfig } from 'swr';
import './globals.css';
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const maxDuration = 60;
export const dynamicParams = false;

export const metadata: Metadata = {
  title: 'Du lịch | Nhà nghỉ dưỡng Ktravel',
  description: 'Đặt chỗ cho mọi phòng, nơi ở du lịch khắp châu á',
  keywords: ['du lịch', 'cho thuê', 'phòng ở', 'du lich', 'cho thue','phong o' ,'Ktravel'],
  metadataBase: new URL("https://www.ktravel.online"),
}
export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
        <NextAuthProvider>
          <body className={inter.className}>
            <Box component={'main'}>
              {children}
            </Box>
          </body>
        </NextAuthProvider>
    </html>
  )
}
