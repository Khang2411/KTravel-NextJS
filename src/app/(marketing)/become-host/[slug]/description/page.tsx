'use client'
import InputField from "@/components/form/PhotoField";
import { Box, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

type FormValues = {
    description: string,
};
const schema = yup.object({
    description: yup.string().required("Tiêu đề là bắt buộc.").max(500, 'Không vượt quá 500 ký tự'),
}).required();

const Page = () => {
    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            description: "",
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
                    <Typography fontSize={30} fontWeight={600}>Tạo phần mô tả</Typography>
                    <Typography fontSize={18} color={'#717171'}>
                        Chia sẻ những điều tạo nên nét đặc biệt cho chỗ ở của bạn.
                    </Typography>
                </Box>
                <Box>
                    <InputField control={control} name="description" label='Mô tả' row={8} multiline={true} />
                </Box>
            </Box>
        </Box>
    );
}

export default Page;