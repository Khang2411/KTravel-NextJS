'use client'
import { StructureForm } from "@/components/become-host";
import { useCategoryList } from "@/hook/use-category-list";
import { ListParams } from "@/models";
import { Box, Typography } from "@mui/material";
import { Suspense, useEffect } from "react";

const Page = () => {
    const filters: Partial<ListParams> = {
        page: 2,
    }
    const { data, isLoading } = useCategoryList({ params: filters })

    useEffect(() => {
        console.log(isLoading)
        console.log(data)
    }, [data, isLoading])

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' }, height: 'calc(100vh - 170px)' }}>
            {/* <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Khách sẽ được sử dụng loại chỗ ở nào?</Typography>
                </Box>

                <Box>
                    <Suspense fallback={<p>Loading feed...</p>}>
                        <StructureForm data={data.data}></StructureForm>
                    </Suspense>
                </Box>
            </Box> */}
        </Box>
    )
}

export default Page;