'use client'
import InputField from "@/components/form/PhotoField";
import { Box, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

type FormValues = {
    title: string,
};
const schema = yup.object({
    title: yup.string().required("Tiêu đề là bắt buộc.").max(32, 'Không vượt quá 32 ký tự'),
}).required();

const Page = () => {
    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
        },
        mode: "onChange"
    });
    const handleLoginSubmit = (data: FormValues) => {
        console.log(data)
    };
    return (
        <Box sx={{ paddingInline: { xs: '24px', md: '80px' } }}>
            <Box sx={{ maxWidth: '630px', width: '100%', margin: 'auto' }}>
                <Box marginBottom={'32px'}>
                    <Typography fontSize={30} fontWeight={600}>Bây giờ, hãy đặt tiêu đề cho chỗ ở thuộc danh mục nhà của bạn</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay đổi tiêu đề sau.
                    </Typography>
                </Box>
                <Box>
                    <InputField control={control} name="title" label='Tiêu đề' row={8} multiline={true} />
                </Box>
            </Box>
        </Box>
    );
}

export default Page;