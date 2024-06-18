
import { Box, Button, CircularProgress, Grid, IconButton, RadioGroup, Stack, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Category } from "@/models";
import { ErrorMessage } from "@hookform/error-message"
import RadioField from "@/components/form/RadioField";
import CloseIcon from '@mui/icons-material/Close';

type FormValues = {
    category_id: string,
};

interface StructureFormProps {
    onSubmit?: (payload: FormValues) => void,
    data: Array<Category> | undefined
    handleToggle?: () => void,
}

const schema = yup.object().shape({
    category_id: yup.string().required('Vui lòng chọn'),
});

export const StructureForm = ({ onSubmit, data, handleToggle }: StructureFormProps) => {
    const { handleSubmit, control, formState: { isSubmitting, errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            category_id: "",
        },
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
            <Box marginBottom={2}><Typography fontWeight={600}>Thể loại</Typography></Box>
            <Box>
                <ErrorMessage
                    errors={errors}
                    name="category_id"
                    render={({ message }) => <Typography color={"#be4b4a"}>{message}</Typography>}
                />
                <RadioGroup>
                    <Grid container spacing={2}>
                        {data?.map((item, index) =>
                            <Grid item xs={6} sm={4} marginBottom={'12px'} key={index}>
                                <RadioField control={control}
                                    circle={false}
                                    name="category_id"
                                    value={item.id}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        marginBottom: '13px',
                                        marginInline: 'initial',
                                        '& span': {
                                            width: '100%',
                                            height: '100%',
                                        },
                                        '.Mui-checked ~ span,:hover': {
                                            borderRadius: '12px',
                                            boxShadow: '0 0 0 2px #222222 !important'
                                        }
                                    }}
                                    label={
                                        <Button fullWidth component="div"
                                            sx={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                height: '100%',
                                                color: '#000',
                                                padding: '24px',
                                                border: '1px solid #DDDDDD',
                                                borderRadius: '12px',
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '14px', lineHeight: '18px', color: 'rgb(113, 113, 113)' }}>{item.name}</Typography>
                                        </Button>
                                    } />
                            </Grid>)}
                    </Grid>
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
