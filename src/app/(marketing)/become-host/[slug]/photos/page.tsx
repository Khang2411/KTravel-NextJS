'use client'
import { Box, Typography } from "@mui/material";
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import { FooterBecomeHost } from "@/components/become-host";
import { useRoomList } from "@/hook";
import { FilePondFile } from "filepond";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
registerPlugin(FilePondPluginImagePreview)

const Page = ({ params }: { params: { slug: number } }) => {
    const [files, setFiles] = useState<FilePondFile[]>([])
    const router = useRouter()
    const { updateRoom } = useRoomList({ enable: false })

    useEffect(() => {
        console.log(files)
    }, [files])

    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        defaultValues: {
            files: "",
        },
        mode: "onChange"
    });

    const handleFormSubmit = async () => {
        let fileArray: any[] = []

        if (files.length > 4) {
            files.forEach((image) => {
                fileArray.push(image['file']);
            });

            const data = {
                'id': params.slug,
                'files': fileArray
            }
            
            try {
                toast.loading("Đang upload ảnh. Vui lòng đợi")
                const room = await updateRoom(data)
                router.push(`/become-host/${params.slug}/title`);
            } catch (err) {
                console.log(err)
            }
        }
    };

    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' }, height: 'calc(100vh - 170px)', overflowY: 'auto' }}>
            <ToastContainer />
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
                    <Box mb={5}>
                        <Typography fontSize={30} fontWeight={600}>Bổ sung một số bức ảnh chụp chỗ ở thuộc danh mục nhà của bạn</Typography>
                        <Typography fontSize={18} color={'#717171'}>
                            Bạn sẽ cần 5 bức ảnh để bắt đầu. Về sau, bạn vẫn có thể đăng thêm hoặc thay đổi ảnh.
                        </Typography>
                    </Box>
                    <Typography color={"#be4b4a"}>{files.length < 5 && 'Vui lòng chọn 5 ảnh'}</Typography>
                    <Box>
                        <FilePond
                            files={files.map((file) => file.source)}
                            maxFiles={5}
                            onupdatefiles={(newFiles) => setFiles(newFiles as FilePondFile[])}
                            allowMultiple={true}
                            allowImagePreview={true}
                            imagePreviewHeight={250}
                            name="files"
                            labelIdle='Kéo ảnh của bạn vào đây <div>hoặc</div> <div class="filepond--label-action">Tải lên từ thiết bị</div>'
                        />
                    </Box>
                    <FooterBecomeHost progressInput={60} disabled={isSubmitting} backTo={`/become-host/${params.slug}/floor-plan`} />
                </Box>
            </Box>
        </Box>
    );
}
export default Page;