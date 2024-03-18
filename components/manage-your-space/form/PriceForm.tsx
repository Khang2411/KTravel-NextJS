
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputField from "../../form/PhotoField";
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNumericFormat } from "@/hook";

type FormValues = {
    price: string,
};

export interface PriceFormProps {
    onSubmit?: (payload: FormValues) => void,
    handleToggle?: () => void
}
export interface CustomPropsNumeric {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const schema = yup.object().shape({
    price: yup.string().required("Giá tiền là bắt buộc."),
});

export const PriceForm = ({ onSubmit, handleToggle }: PriceFormProps) => {

    const NumericFormatCustom = useNumericFormat({
        option: {
            thousandSeparator: true,
            decimalScale: 0,
            allowNegative: false
        },
        condition: (values) => {
            if (!values.value) return true;
            const { floatValue }: any = values;
            return floatValue > 0;
        }
    })

    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            price: "",
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
            }}>
            <IconButton aria-label="delete" onClick={handleToggle}
                sx={{ position: 'absolute', right: '10px', top: '0' }}>
                <CloseIcon fontSize="small" />
            </IconButton>
            <Box marginBottom={2}><Typography fontWeight={600}>Giá cơ sở</Typography></Box>
            <Box>
                <InputField control={control} name="price" label='Giá'
                    inputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        ),
                        inputComponent: NumericFormatCustom as any,
                    }} />
            </Box>

            <Box component={'footer'} sx={{ paddingBlock: '24px' }}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Button variant="text">Hủy</Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#000000 !important' }}>Lưu</Button>
                </Stack>
            </Box>
        </Box>
    );
}

