
import { Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import { useNumericFormat } from "@/hook";
import InputField from "@/components/form/InputField";

type FormValues = {
    new_discount: string,
};

export interface New_Listing_DiscountForm_Props {
    onSubmit?: (payload: FormValues) => void,
    handleToggle?: () => void,
    new_discount: number | undefined
}

export const NewListingDiscount = ({ onSubmit, handleToggle, new_discount }: New_Listing_DiscountForm_Props) => {

    const NumericFormatCustom = useNumericFormat({
        option: { suffix: '%' },
        condition: (values) => {
            const { floatValue, value } = values;
            if (!value) return true;
            if (value == 0 && value.length > 1) return false;
            return floatValue < 100;
        }
    })

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<FormValues>({
        defaultValues: {
            new_discount: new_discount?.toString(),
        },
    });

    const handleFormSubmit = async (payload: FormValues) => {
        console.log(payload)
        await onSubmit?.(payload)
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}
            sx={{
                position: 'relative',
                border: '1px solid rgb(221, 221, 221)',
                borderRadius: '16px',
                padding: '16px 24px',
            }} >
            <IconButton aria-label="delete" onClick={handleToggle}
                sx={{ position: 'absolute', right: '10px', top: '0' }}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Box marginBottom={2}>
                <Typography fontWeight={600}>Giảm giá cho 3 khách đặt sớm</Typography>
            </Box>
            <Box>
                <InputField control={control} name="new_discount" label=''
                    InputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }} />
            </Box>
            <Box component={'footer'} sx={{ paddingBlock: '24px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="text" onClick={handleToggle}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null} sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                </Stack>
            </Box>
        </Box >
    );
}

