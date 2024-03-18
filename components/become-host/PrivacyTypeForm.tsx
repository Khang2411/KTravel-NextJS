
import { Box, ButtonBase, FormControl, RadioGroup, Stack, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FooterBecomeHost } from "./";
import RadioField from "../form/RadioField";

type FormValues = {
    room_type: string,
};
const schema = yup.object().shape({
    room_type: yup.string().required(),
});

export interface PrivacyTypeFormProps {
    onSubmit?: (payload: FormValues) => void,
    data: any[]
}
export const PrivacyTypeForm = ({ onSubmit, data }: PrivacyTypeFormProps) => {

    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            room_type: "",
        },
        mode: "onChange"
    });

    const handleFormSubmit = async (payload: FormValues) => {
        console.log(payload)
        await onSubmit?.(payload)
    };
    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
            <Box>
                <RadioGroup>
                    {data.map((item, index) =>
                        <RadioField control={control}
                            circle={false}
                            key={index}
                            name="room_type"
                            value={item.type}
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
                                        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{item.description}</Typography>
                                        <Typography sx={{ fontSize: '14px', lineHeight: '18px', color: 'rgb(113, 113, 113)' }}>{item.helper_text}</Typography>
                                    </Box>
                                    <Typography>{item.icon}</Typography>
                                </ButtonBase>} />
                    )}
                </RadioGroup>
            </Box>
            <FooterBecomeHost progressInput={10} />
        </Box>
    );
}
