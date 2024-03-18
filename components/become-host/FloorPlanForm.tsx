import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../form/PhotoField";
import { FooterBecomeHost } from "./FooterBecomeHost";

type FormValues = {
    guests: number,
    bedrooms: number,
    beds: number,
    bathrooms: number
};

export interface FloorPlanFormProps {
    onSubmit?: (payload: FormValues) => void,
    data: any[]
}

export const FloorPlanForm = ({ onSubmit, data }: FloorPlanFormProps) => {
    const [state, setState] = useState<FormValues>({ guests: 1, bedrooms: 1, beds: 1, bathrooms: 1 })

    const { handleSubmit, control, setValue } = useForm<FormValues>({
        defaultValues: {
            guests: 1,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1
        },
        mode: "onChange"
    });
    const handleIncrement = (type: keyof FormValues) => {
        setState({ ...state, [type]: state[type] + 1 });
    }

    const handleDecrement = (type: keyof FormValues) => {
        setState({ ...state, [type]: state[type] <= 1 ? 1 : state[type] - 1 });

    }

    useEffect(() => {
        data.map((item: any, index) => {
            setValue(item.type, state[item.type as keyof FormValues])
        })
    }, [data, setValue, state])

    const handleFormSubmit = async (payload: FormValues) => {
        await onSubmit?.(payload)
    };

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleFormSubmit)}>
            <Box>
                    {data.map((item, index) =>
                        <Box key={index} padding={'16px 0'}>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Box><Typography>{item.name}</Typography></Box>
                                <Box>
                                    <Stack direction={'row'} gap={2} alignItems={'center'}>
                                        <IconButton aria-label="delete" size="small" onClick={() => handleDecrement(item.type)}
                                            sx={{ border: '1px solid #B0B0B0' }}>
                                            <RemoveIcon />
                                        </IconButton>

                                        <Typography component={'span'}>{state[item.type as keyof FormValues]}</Typography>
                                        <InputField control={control} name={item.type} label='Giá' sx={{ display: 'none' }} />

                                        <IconButton aria-label="delete" size="small" onClick={() => handleIncrement(item.type)}
                                            sx={{ border: '1px solid #B0B0B0' }}>
                                            <AddIcon />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </Stack>
                            {index === data.length - 1 ? '' : <Divider sx={{ marginTop: '13px' }} />}
                        </Box>
                    )}
            </Box>
            <FooterBecomeHost progressInput={90} disabled={false} />
        </Box>
    );
}
