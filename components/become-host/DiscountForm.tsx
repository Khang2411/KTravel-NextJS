import { Stack, Box, Typography, InputAdornment } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CheckBoxField from "../form/CheckBoxField";
import { useForm } from "react-hook-form";
import { FooterBecomeHost } from "./";
import InputField from "../form/PhotoField";
import { DiscountPayload } from "@/models";
import PercentIcon from '@mui/icons-material/Percent';
import { useNumericFormat } from "@/hook";
import { useRef } from "react";

interface DiscountFormProps {
    onSubmit?: (payload: DiscountPayload) => void,
    data: any[]
}
const schema = yup.object().shape({
    monthlyDiscount: yup.array().required(),
    weeklyDiscount: yup.array().required(),
    newListingPromotion: yup.array().required(),
    weeklyDiscountInput: yup.string().nullable().test('isSmaller', 'Mức giảm giá theo tuần phải thấp hơn mức giảm giá theo tháng', (value, testContext) => {
        if (Number(testContext.parent.weeklyDiscountInput) !== 0) {
            if (Number(testContext.parent.monthlyDiscountInput) <= Number(testContext.parent.weeklyDiscountInput)) return false
        }
        return true
    }),
    monthlyDiscountInput: yup.string().nullable().test('isLarger', 'Mức giảm giá theo tháng phải cao hơn mức giảm giá theo tuần', (value, testContext) => {
        if (Number(testContext.parent.monthlyDiscountInput) !== 0) {
            if (Number(testContext.parent.monthlyDiscountInput) <= Number(testContext.parent.weeklyDiscountInput)) return false
        }
        return true
    })
});

export const DiscountForm = ({ onSubmit, data }: DiscountFormProps) => {

    const NumericFormatCustom = useNumericFormat({
        condition: (values) => {
            const { floatValue, value }: any = values;
            if (!value) return true;
            if (value == 0 && value[1] == 0) return false;
            return floatValue < 100;
        }
    })

    const { handleSubmit, control, watch } = useForm<DiscountPayload>({
        resolver: yupResolver(schema),
        defaultValues: {
            monthlyDiscount: ['15'],
            weeklyDiscount: ['10'],
            newListingPromotion: ['20'],
            monthlyDiscountInput: '15',
            weeklyDiscountInput: '10',
        },
        mode: "all",
    });

    const handleFormSubmit = async (payload: DiscountPayload) => {
        await onSubmit?.(payload)
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
            <Box>
                {data.map((item, index) =>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} key={index} position={'relative'}
                        sx={{
                            paddingBlock: '32px',
                            backgroundColor: '#F7F7F7',
                            boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;',
                            borderRadius: '12px',
                            marginBlockEnd: '24px'
                        }}>
                        <Box sx={{
                            marginInline: '16px', width: '75px',
                            '& > div': { position: 'unset' },
                            '& .MuiFormHelperText-root': { position: 'absolute', bottom: '5px', margin: '3px 0' }
                        }}>
                            {item.name !== 'newListingPromotion' ?
                                <InputField
                                    control={control}
                                    name={`${item.name}Input`}
                                    sx={{ '& input': { fontWeight: '600', fontSize: '18px' } }}
                                    InputProps={{
                                        disabled: watch(item.name)[0] === null ? true : false,
                                        endAdornment: (
                                            <InputAdornment position="end" sx={{ marginLeft: 0 }}>
                                                <PercentIcon sx={{ color: '#000000' }} />
                                            </InputAdornment>
                                        ),
                                        inputComponent: NumericFormatCustom as any,
                                    }} /> :
                                <Typography fontSize={18} fontWeight={600} textAlign={'center'}>{item.defaultPercent}<PercentIcon /></Typography>
                            }
                        </Box>

                        <Box flex={1}>
                            <Typography>{item.title}</Typography>
                            <Typography color={'#717171'} fontSize={14}>{item.description}</Typography>
                        </Box>

                        <Box>
                            <CheckBoxField
                                control={control}
                              
                                options={[item.defaultPercent]}
                                name={item.name} />
                        </Box>
                    </Stack>
                )}
            </Box>
            <FooterBecomeHost progressInput={95} disabled={false} />
        </Box>
    );
}


