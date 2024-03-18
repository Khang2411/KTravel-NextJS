
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../../form/PhotoField";
import CloseIcon from '@mui/icons-material/Close';
import { useNumericFormat } from "@/hook";

type FormValues = {
    newListingsDiscount: string,
};

export interface New_Listing_DiscountForm_Props {
    onSubmit?: (payload: FormValues) => void,
    handleToggle?: () => void
}

export const NewListingDiscount = ({ onSubmit, handleToggle }: New_Listing_DiscountForm_Props) => {

    const NumericFormatCustom = useNumericFormat({
        option: { suffix: '%' },
        condition: (values) => {
            const { floatValue, value } = values;
            if (!value) return true;
            if (value == 0 && value.length > 1) return false;
            return floatValue < 100;
        }
    })

    const { handleSubmit, control } = useForm<FormValues>({
        defaultValues: {
            newListingsDiscount: "",
        },
        mode: "onChange"
    });

    const handleFormSubmit = async (payload: FormValues) => {
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
                <InputField control={control} name="newListingsDiscount" label=''
                    inputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }} />
            </Box>
            <Box component={'footer'} sx={{ paddingBlock: '24px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="text">Hủy</Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                </Stack>
            </Box>
        </Box >
    );
}

