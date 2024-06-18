'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, ButtonBase, CircularProgress, IconButton, RadioGroup, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage } from "@hookform/error-message"
import { Privacy } from '@/models';
import RadioField from '@/components/form/RadioField';
import CloseIcon from '@mui/icons-material/Close';

type FormValues = {
    privacy_type: string,
};
const schema = yup.object().shape({
    privacy_type: yup.string().required("Vui lòng chọn"),
});

interface PrivacyTypeFormProps {
    onSubmit?: (payload: FormValues) => void,
    data: Privacy[] | undefined,
    handleToggle?: () => void,

}
export const PrivacyTypeForm = ({ onSubmit, data, handleToggle }: PrivacyTypeFormProps) => {

    const { handleSubmit, control, formState: { isSubmitting, errors } } = useForm<FormValues>({
        defaultValues: {
            privacy_type: "",
        },
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (payload: FormValues) => {
        await onSubmit?.(payload)
    };
    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)} sx={{
            position: 'relative',
            border: '1px solid rgb(221, 221, 221)',
            borderRadius: '16px',
            padding: '16px 24px',
        }}>
            <IconButton aria-label="delete" onClick={handleToggle}
                sx={{ position: 'absolute', right: '10px', top: '0', marginBlockEnd: '15px' }}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Box marginBottom={2}><Typography fontWeight={600}>Loại hình cho thuê</Typography></Box>
            <Box>
                <ErrorMessage
                    errors={errors}
                    name="privacy_type"
                    render={({ message }) => <Typography color={"#be4b4a"}>{message}</Typography>}
                />
                <RadioGroup>
                    {data?.map((item, index) =>
                        <RadioField control={control}
                            circle={false}
                            key={index}
                            name="privacy_type"
                            value={item.id}
                            sx={{
                                marginBottom: '13px',
                                marginInline: 'initial',
                                '& span': {
                                    width: '100%'
                                },
                                '.Mui-checked ~ span, &:hover': {
                                    borderRadius: '32px',
                                    boxShadow: '0 0 0 2px #222222 !important'
                                },
                            }}
                            label={
                                <ButtonBase component="div"
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        border: '1px solid #DDDDDD',
                                        padding: '24px',
                                        borderRadius: '32px',
                                    }}>
                                    <Box>
                                        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{item?.name}</Typography>
                                        <Typography sx={{ fontSize: '14px', lineHeight: '18px', color: 'rgb(113, 113, 113)' }}>{item?.description}</Typography>
                                    </Box>
                                </ButtonBase>} />
                    )}
                </RadioGroup>
            </Box>
            <Box sx={{ paddingBlock: '24px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="text" onClick={handleToggle}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                        sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                </Stack>
            </Box>
        </Box>
    );
}
