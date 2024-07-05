/* eslint-disable jsx-a11y/alt-text */
'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { default as ReactWebCam, default as Webcam } from 'react-webcam';
import * as yup from "yup";

type VerifyFormProps = {
    onSubmit?: (payload: any) => void,
}

const schema = yup.object({
    selfile: yup.string().required("Ảnh là bắt buộc."),
}).required();

export const SelfileForm = ({ onSubmit }: VerifyFormProps) => {
    const [imgSrc, setImgSrc] = React.useState<string | null>(null);
    const webcamRef = React.useRef<ReactWebCam>(null);

    const { handleSubmit, control, setValue, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            selfile: "",
        },
    });

    const capture = React.useCallback(() => {
        const image = webcamRef.current && webcamRef.current.getScreenshot();
        setValue('selfile', image ?? '');
        setImgSrc(image);
        console.log(image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [webcamRef, setImgSrc]);

    const handleLoginSubmit = async (payload: any) => {
        await onSubmit?.(payload)
    };

    const videoConstraints = {
        width: 500,
        height: 300,
        facingMode: "user"
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleLoginSubmit)}>
            <ToastContainer />
            <Box sx=
                {{
                    '& .MuiTextField-root': { mt: 1 },
                }}>
                {!imgSrc && <Box position={'relative'} width={500} height={300} maxWidth={'100%'}>
                    <Webcam audio={false}
                        height={300}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={500}
                        videoConstraints={videoConstraints}
                    />
                    <Box position={'absolute'} width={197} height={229}
                        sx={{
                            outline: 'rgb(255, 255, 255) solid 3px !important',
                            borderRadius: '50%',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000,
                        }}>
                    </Box>
                </Box>}
            </Box>
            {imgSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imgSrc}
                />
            )}
            <Box mt={4}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        {imgSrc ? <Typography onClick={() => setImgSrc(null)} sx={{ cursor: 'pointer' }}>Chụp lại</Typography> : <Link href={'/verify-account'}><Typography>Quay lại</Typography> </Link>}
                    </Box>
                    <Box>
                        {!imgSrc && <Button
                            type="button"
                            variant="contained"
                            onClick={capture}
                            sx={{
                                backgroundColor: '#222222 !important',
                                width: '100%',
                                borderRadius: '8px'
                            }}>
                            Chụp ảnh
                        </Button>
                        }
                        
                        {imgSrc &&
                            <Button
                                type='submit'
                                variant="contained"
                                disabled={isSubmitting}
                                startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                                sx={{
                                    backgroundColor: '#222222 !important',
                                    width: '100%',
                                    borderRadius: '8px'
                                }}>
                                Gửi ảnh
                            </Button>}
                    </Box>
                </Stack>
            </Box>

        </Box>
    );
}
