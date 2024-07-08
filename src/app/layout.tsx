import { NextAuthProvider } from '@/components/common';
import '@fontsource/roboto/500.css';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const maxDuration = 60;

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
