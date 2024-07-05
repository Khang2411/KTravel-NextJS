'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, ButtonBase, RadioGroup, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import RadioField from "../form/RadioField";
import { FooterBecomeHost } from "./";
import { ErrorMessage } from "@hookform/error-message"
import { Privacy } from '@/models';

type FormValues = {
    privacy_type: string,
};
const schema = yup.object().shape({
    privacy_type: yup.string().required("Vui lòng chọn"),
});

interface PrivacyTypeFormProps {
    onSubmit?: (payload: FormValues) => void,
    data: Privacy[] | undefined,
    id: number
}
export const PrivacyTypeForm = ({ onSubmit, data, id }: PrivacyTypeFormProps) => {

    const { handleSubmit, control, formState: { isSubmitting, errors } } = useForm<FormValues>({
        defaultValues: {
            privacy_type: "",
        },
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (payload: FormValues) => {
        console.log(errors)
        await onSubmit?.(payload)
    };
    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
            <Box>
                <ErrorMessage
                    errors={errors}
                    name="privacy_type"
                    render={({ message }) => <Typography color={"#be4b4a"}>{message}</Typography>}
                />
                <RadioGroup>
                    {data?.map((item, index) =>
                        <RadioField control={control}
                            circle={false}
                            key={index}
                            name="privacy_type"
                            value={item.id}
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
                                        <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{item?.name}</Typography>
                                        <Typography sx={{ fontSize: '14px', lineHeight: '18px', color: 'rgb(113, 113, 113)' }}>{item?.description}</Typography>
                                    </Box>
                                </ButtonBase>} />
                    )}
                </RadioGroup>
            </Box>
            <Box mt={5}>
                <FooterBecomeHost progressInput={20} disabled={isSubmitting} backTo={`/become-host/${id}/structure`} />
            </Box>
        </Box>
    );
}
