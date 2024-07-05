'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { PhotoField } from '../form';

type AccountAvatarFormProps = {
    onSubmit?: (payload: any) => void,
    handleToggle?: () => void,
    avatar: string
}
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const schema = yup.object({
    avatar: yup.mixed().required("Ảnh là bắt buộc.").test('format',
        'Định dạng ảnh phải là png/jpg', (value) => (value && SUPPORTED_FORMATS.includes((value as { file: File }).file.type))),
}).required();

export const AccountAvatarForm = ({ onSubmit, handleToggle, avatar }: AccountAvatarFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            avatar: avatar,
        },
    });

    const handleAvatarSubmit = async (payload: { avatar: { file: File } }) => {
        await onSubmit?.(payload)
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleAvatarSubmit as any)}
            sx={{
                position: 'relative',
                padding: '16px 24px',
            }}>

            <Box>
                <Box>
                    <Box sx={{ border: '1px dashed rgb(106, 106, 106)', textAlign: 'center', padding: 1 }}>
                        <Box sx={{ '&  img': { margin: 'auto', height: '140px !important' } }}>
                            <PhotoField control={control} name="avatar" src={avatar} srcHeight={140} srcWidth={140} editAvatar={true} />
                        </Box>
                        <Typography> Tải lên ảnh mặt trước</Typography>
                        <Typography component='span' fontSize={'12px'}>Chỉ định dạng JPEG hoặc PNG</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ paddingBlock: '24px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="text" onClick={handleToggle}>Hủy</Button>
                    <Button type="submit" variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null} sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                </Stack>
            </Box>
        </Box>
    );
}
