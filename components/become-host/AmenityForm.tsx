'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FooterBecomeHost } from './FooterBecomeHost';
import { ErrorMessage } from '@hookform/error-message';

type AmenityFormProps = {
    amenities: any
    onSubmit?: (payload: any) => void,
    id: number
};
const schema = yup.object({
    amenities: yup.array().min(1, "Vui lòng chọn").required("Vui lòng chọn"),
}).required();


export const AmenityForm = ({ amenities, onSubmit, id }: AmenityFormProps) => {
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
            <Box component={'form'} onSubmit={handleSubmit(handleAmenitySubmit)}>
                <Box height={'100vh'}> <Grid container spacing={2}>
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
                </Grid></Box>

                <Box mt={5}>
                    <FooterBecomeHost progressInput={25} disabled={isSubmitting} backTo={`/become-host/${id}/privacy-type`} />
                </Box>
            </Box>
        </Box>
    )
}