import { useNumericFormat } from "@/hook";
import { DiscountPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import PercentIcon from '@mui/icons-material/Percent';
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CheckBoxField from "../form/CheckBoxField";
import InputField from "../form/InputField";
import { FooterBecomeHost } from "./";

interface DiscountFormProps {
    onSubmit?: (payload: DiscountPayload) => void,
    data: any[],
    id: number
}
const schema = yup.object().shape({
    monthlyDiscount: yup.string().required(),
    weeklyDiscount: yup.string().required(),
    newListingDiscount: yup.string().required(),
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

export const DiscountForm = ({ onSubmit, data,id }: DiscountFormProps) => {
    const NumericFormatCustom = useNumericFormat({
        condition: (values) => {
            const { floatValue, value }: any = values;
            if (!value) return true;
            if (value == 0 && value[1] == 0) return false;
            return floatValue < 100;
        }
    })

    const { handleSubmit, control, watch, formState: { isSubmitting, errors } } = useForm<DiscountPayload>({
        resolver: yupResolver(schema as any),
        defaultValues: {
            monthlyDiscount: '15',
            weeklyDiscount: '10',
            newListingDiscount: '20',
            monthlyDiscountInput: '15',
            weeklyDiscountInput: '10',
        },
    });

    const handleFormSubmit = async (payload: DiscountPayload) => {
        await onSubmit?.(payload)
    };

    return (
        <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
            <Box height={'100vh'}>
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

                            {item.name !== 'newListingDiscount' ?
                                <InputField
                                    control={control}
                                    name={`${item.name}Input`}
                                    placeholder="0"
                                    sx={{ '& input': { fontWeight: '600', fontSize: '18px' } }}
                                    InputProps={{
                                        disabled: watch(item.name) === 0 ? true : false,
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
                                options={item.defaultPercent}
                                name={item.name} />
                        </Box>
                    </Stack>
                )}
            </Box>
            <Box mt={5}>
                <FooterBecomeHost progressInput={95} disabled={isSubmitting} backTo={`/become-host/${id}/price`}/>
            </Box>
        </Box>
    );
}


