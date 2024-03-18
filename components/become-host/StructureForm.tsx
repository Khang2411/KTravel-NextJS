
import { Box, Button, Grid, RadioGroup, Typography } from "@mui/material";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FooterBecomeHost } from "./";
import RadioField from "../form/RadioField";

type FormValues = {
    category_id: string,
};

export interface StructureFormProps {
    onSubmit?: (payload: FormValues) => void,
    data: any[]
}

const schema = yup.object().shape({
    category_id: yup.string().required(),
});

export const StructureForm = ({ onSubmit, data }: StructureFormProps) => {
    const { handleSubmit, control } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            category_id: "",
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
                    <Grid container spacing={2}>
                        {data.map((item, index) =>
                            <Grid item xs={6} sm={4} marginBottom={'12px'} key={index}>
                                <RadioField control={control}
                                    circle={false}
                                    name="category_id"
                                    value={item.id}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        marginBottom: '13px',
                                        marginInline: 'initial',
                                        '& span': {
                                            width: '100%',
                                            height: '100%',
                                        },
                                        '.Mui-checked ~ span,:hover': {
                                            borderRadius: '12px',
                                            boxShadow: '0 0 0 2px #222222 !important'
                                        }
                                    }}
                                    label={
                                        <Button fullWidth component="div"
                                            sx={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                height: '100%',
                                                color: '#000',
                                                padding: '24px',
                                                border: '1px solid #DDDDDD',
                                                borderRadius: '12px',
                                            }}
                                        >
                                            <Typography>1</Typography>
                                            <Typography sx={{ fontSize: '14px', lineHeight: '18px', color: 'rgb(113, 113, 113)' }}>{item.name}</Typography>
                                        </Button>
                                    } />
                            </Grid>)}
                    </Grid>
                </RadioGroup>
            </Box>
            <FooterBecomeHost progressInput={10} disabled={false} />
        </Box>
    );
}
