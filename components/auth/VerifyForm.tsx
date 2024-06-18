'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { PhotoField } from '../form';

type VerifyFormProps = {
    onSubmit?: (payload: { frontCard: { file: File }, backCard: { file: File } }) => void,
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const schema = yup.object({
    frontCard: yup.mixed().required("Ảnh là bắt buộc.").test('format',
        'Định dạng ảnh phải là png/jpg', (value) => (value && SUPPORTED_FORMATS.includes((value as { file: File }).file.type))),
    backCard: yup.mixed().required("Ảnh là bắt buộc.").test('format',
        'Định dạng ảnh phải là png/jpg', (value) => (value && SUPPORTED_FORMATS.includes((value as { file: File }).file.type))),
}).required();

export const VerifyForm = ({ onSubmit }: VerifyFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            frontCard: "",
            backCard: ""
        },
    });

    const handleLoginSubmit = async (payload: { frontCard: { file: File }; backCard: { file: File }; }) => {
        await onSubmit?.(payload)
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleLoginSubmit as any)}>
            <Box sx=
                {{
                    '& .MuiTextField-root': { mt: 1 },
                }}>
                <Box>
                    <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                        <Box width={'49%'}>
                            <Box sx={{ border: '1px dashed rgb(106, 106, 106)', textAlign: 'center', padding: 1 }}>
                                <Box sx={{ '&  img': { margin: 'auto', height: '140px !important' } }}>
                                    <PhotoField control={control} name="frontCard" src={'/images/front-id-card.png'} srcHeight={140} srcWidth={140} />
                                </Box>
                                <Typography> Tải lên ảnh mặt trước</Typography>
                                <Typography component='span' fontSize={'12px'}>Chỉ định dạng JPEG hoặc PNG</Typography>
                            </Box>
                        </Box>

                        <Box width={'49%'}>
                            <Box sx={{ border: '1px dashed rgb(106, 106, 106)', textAlign: 'center', padding: 1 }}>
                                <Box sx={{ '&  img': { margin: 'auto', height: '140px !important' } }}>
                                    <PhotoField control={control} name="backCard" src={'/images/back-id-card.png'} srcHeight={140} srcWidth={140} />
                                </Box>
                                <Typography> Tải kên ảnh mặt sau</Typography>
                                <Typography component='span' fontSize={'12px'}>Chỉ định dạng JPEG hoặc PNG</Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Box>

            <Box mt={4}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Link href={'/'}>
                            <Typography>Quay lại</Typography>
                        </Link>
                    </Box>
                    <Box>
                        <Button type="submit" variant="contained"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                            sx={{
                                backgroundColor: '#222222 !important',
                                width: '100%',
                                borderRadius: '8px'
                            }}>
                            Tiếp tục
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
