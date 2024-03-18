import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function Error() {
  return (
    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} minHeight={'50vh'}>
      <Typography variant='h3'>
        500 - Server-side error occurred
      </Typography>
    </Stack>
  )
}