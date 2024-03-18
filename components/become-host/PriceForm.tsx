'use client'
import { useNumericFormat } from "@/hook";
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../form/PhotoField";
import { FooterBecomeHost } from "./";

type FormValues = {
    price: number,
};
const schema = yup.object().shape({
    price: yup.number().min(10).required("Giá tiền là bắt buộc."),
});

export interface PriceFormProps {
    onSubmit?: (payload: FormValues) => void,
}
export const PriceForm = ({ onSubmit }: PriceFormProps) => {
    const maxFontSize = 42;
    const [fontSize, setFontSize] = useState(maxFontSize)
    const [value, setValue] = useState<FormValues>({ price: 0 })
    const ref: any = useRef(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            price: 0,
        },
        mode: "all"
    });

    const NumericFormatCustom = useNumericFormat({
        option: { thousandSeparator: true, decimalScale: 0 },
        condition: (values: any) => {
            const { floatValue, value } = values;
            if (!value) return true;
            return floatValue > 0;
        }
    })

    const handleFormSubmit = async (payload: FormValues) => {
        await onSubmit?.(payload)
    };
 
    const scaleFontSize = (width: number) => {
        const textInputWidth = matches ? 280 : 630;
        const actualWidth = width + fontSize;
        const scaledSize = Math.min(
            maxFontSize,
            fontSize * (textInputWidth / actualWidth)
        );
        setFontSize(scaledSize);
    };

    function handleChange(e: any) {
        console.log('handle change', e);
        const width = ref.current.offsetWidth;
        scaleFontSize(width);
        setValue({ price: e.target.value });
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={{ padding: '32px 0', border: { sm: '1px solid #b0b0b0' }, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', '& span, & input': { fontSize: `${fontSize}px`, fontWeight: '600', width: '100%' } }}>
                    <Box ref={ref} sx={{ display: 'flex', justifyContent: 'space between' }}>
                        <Typography component="span" >$</Typography>
                        <Typography component="span" sx={{ visibility: 'hidden' }}>
                            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value.price)}
                        </Typography>
                    </Box>
                    <InputField
                        control={control}
                        variant="standard"
                        name={"price"}
                        helperText={false}
                        sx={{ '& input': { textAlign: 'right' }, position: 'absolute !important', right: '0', top: '-4px' }}
                        onChange={(e) => handleChange(e)}
                        autoComplete='off'
                        InputProps={{
                            disableUnderline: true,
                            autoFocus: true,
                            inputComponent: NumericFormatCustom as any,
                        }}
                    />
                </Box>
            </Box>
            <FooterBecomeHost progressInput={90} disabled={errors.price ? true : false} />
        </Box >
    );
}
