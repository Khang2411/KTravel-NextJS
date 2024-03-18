'use client'
import axiosClient from '@/api-client/axios-client';
import { Footer, NextAuthProvider } from '@/components/common';
import '@fontsource/roboto/500.css';
import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google';
import { SWRConfig } from 'swr';
import './globals.css';
import { Box } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false
        }}
      >
        <NextAuthProvider>
          <body className={inter.className}>
            <Box component={'main'}>
              {children}
            </Box>
            <Box component={'footer'}>
              <Footer></Footer>
            </Box>
          </body>
        </NextAuthProvider>
      </SWRConfig>
    </html>
  )
}
