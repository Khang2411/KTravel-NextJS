
import { Box, Button, CircularProgress, FormHelperText, IconButton, Stack, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import { useNumericFormat } from "@/hook";
import InputField from "@/components/form/InputField";

type FormValues = {
    weekly_discount: string,
};


export interface Weekly_DiscountForm_Props {
    onSubmit?: (payload: FormValues) => void,
    handleToggle?: () => void,
    weekly_discount: number | undefined,
    monthly_discount: number | undefined,
}

export const WeeklyDiscountForm = ({ onSubmit, handleToggle, weekly_discount, monthly_discount }: Weekly_DiscountForm_Props) => {

    const schema = yup.object().shape({
        weekly_discount: yup.string().nullable().test('isSmaller', 'Mức giảm giá theo tuần phải thấp hơn mức giảm giá theo tháng', (value, testContext) => {
            if (Number(testContext.parent.weeklyDiscountInput) !== 0) {
                if (monthly_discount === 0) return true
                if (Number(testContext.parent.weekly_discount) >= Number(monthly_discount)) return false
            }
            return true
        }),
    });

    const NumericFormatCustom = useNumericFormat({
        option: { suffix: '%' },
        condition: (values) => {
            const { floatValue, value } = values;
            if (!value) return true;
            return floatValue < 100;
        }
    })

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<FormValues>({
        resolver: yupResolver(schema as any),
        defaultValues: {
            weekly_discount: weekly_discount?.toString(),
        },
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
                <Typography fontWeight={600}>Giảm giá tuần</Typography>
                <FormHelperText>
                    Ưu đãi giảm giá theo tuần áp dụng cho những đặt phòng có thời gian ở từ 7 ngày trở lên.
                    Nếu bạn cung cấp nhiều mức giảm giá theo thời gian ở thì chúng tôi sẽ áp dụng mức giảm giá cho thời gian ở lâu nhất.
                </FormHelperText>
            </Box>
            <Box>
                <InputField control={control} name="weekly_discount" placeholder="0%"
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
        </Box>
    );
}

