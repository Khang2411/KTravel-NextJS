'use client'
import { Box, Typography } from "@mui/material";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useEffect, useState } from "react";
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImagePreview)

const Page = () => {
    const [files, setFiles] = useState([] as any[])

    useEffect(() => {
        console.log(files)
    }, [files])

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' }, height: 'calc(100vh - 170px)', overflowY: 'auto' }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Bổ sung một số bức ảnh chụp chỗ ở thuộc danh mục nhà của bạn</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Bạn sẽ cần 5 bức ảnh để bắt đầu. Về sau, bạn vẫn có thể đăng thêm hoặc thay đổi ảnh.
                    </Typography>
                </Box>
                <Box>
                    <FilePond
                        files={files}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        name="files"
                        labelIdle='Kéo ảnh của bạn vào đây <div>hoặc</div> <div class="filepond--label-action">Tải lên từ thiết bị</div>'
                    />
                </Box>
            </Box>
        </Box>
    );
}
export default Page;