'use client'
import { EditorForm } from '@/components/become-host/EditorForm'
import { Box } from '@mui/material'

type Props = {}

const Page = (props: Props) => {
  const handleSubmit = (payload) => {
    console.log(payload)
  }
  return (
    <Box>
      <EditorForm onSubmit={handleSubmit}></EditorForm>
    </Box>
  )
}
export default Page