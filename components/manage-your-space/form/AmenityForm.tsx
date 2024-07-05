'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage } from '@hookform/error-message';
import CloseIcon from '@mui/icons-material/Close';

type AmenityFormProps = {
    amenities: any
    onSubmit?: (payload: any) => void,
    handleToggle?: () => void,
};
const schema = yup.object({
    amenities: yup.array().min(1, "Vui lòng chọn").required("Vui lòng chọn"),
}).required();


export const AmenityForm = ({ amenities, onSubmit, handleToggle }: AmenityFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { amenities: [] },
    });

    const handleAmenitySubmit = async (payload: { amenities: Array<string> }) => {
        await onSubmit?.(payload)
    };

    return (
        <Box>
            <ErrorMessage
                errors={errors}
                name="amenities"
                render={({ message }) => <Typography color={"#be4b4a"}>{message}</Typography>}
            />
            <Box component={'form'} onSubmit={handleSubmit(handleAmenitySubmit)} sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }}>
                <IconButton aria-label="delete" onClick={handleToggle}
                    sx={{ position: 'absolute', right: '10px', top: '0' }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
                <Box marginBottom={2}><Typography fontWeight={600}>Tiện nghi</Typography></Box>
                <Grid container spacing={2}>
                    {amenities?.data.map((item: { id: number, name: string, icon: string }, index: React.Key) =>
                        <Grid item xs={6} sm={4} key={index} marginBottom={'12px'}>
                            <FormControlLabel
                                label={
                                    <>
                                        <Box dangerouslySetInnerHTML={{ __html: item.icon }} />
                                        <Box>{item.name}</Box>
                                    </>
                                }
                                control={
                                    <Checkbox
                                        {...register("amenities", { required: true })}
                                        value={item.id}
                                    />
                                }
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    color: '#000',
                                    padding: '24px',
                                    border: '1px solid #DDDDDD',
                                    borderRadius: '12px',
                                    ':hover': {
                                        borderColor: 'transparent',
                                        boxShadow: '0 0 0 2px #222222 !important'
                                    },
                                    '&.active': {
                                        boxShadow: '0 0 0 2px #222222 !important'
                                    },
                                }}
                            />

                        </Grid>
                    )}
                </Grid>
                <Box sx={{ paddingBlock: '24px' }}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Button variant="text" onClick={handleToggle}>Hủy</Button>
                        <Button type="submit" variant="contained"
                            disabled={isSubmitting}
                            startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null} sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}