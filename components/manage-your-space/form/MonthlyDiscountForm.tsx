
import { Box, Button, FormHelperText, IconButton, Stack, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputField from "../../form/PhotoField";
import CloseIcon from '@mui/icons-material/Close';
import { useNumericFormat } from "@/hook";

type FormValues = {
    monthlyDiscount: string,
};
export interface Monthly_DiscountForm_Props {
    onSubmit?: (payload: FormValues) => void,
    handleToggle?: () => void
}

interface CustomPropsNumeric {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
const schema = yup.object().shape({
    monthlyDiscount: yup.string().required("Giá tiền là bắt buộc."),
});

export const MonthlyDiscountForm = ({ onSubmit, handleToggle }: Monthly_DiscountForm_Props) => {

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
        resolver: yupResolver(schema),
        defaultValues: {
            monthlyDiscount: "",
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
            <Box marginBottom={2}>
                <Typography fontWeight={600}>Giảm giá tháng</Typography>
                <FormHelperText>
                    Ưu đãi giảm giá theo tháng áp dụng cho những đặt phòng có thời gian ở từ 28 ngày trở lên.
                    Nếu bạn cung cấp nhiều mức giảm giá theo thời gian ở thì chúng tôi sẽ áp dụng mức giảm giá cho thời gian ở lâu nhất.
                </FormHelperText>
            </Box>
            <Box>
                <InputField control={control} name="monthlyDiscount" label=''
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
        </Box>
    );
}

