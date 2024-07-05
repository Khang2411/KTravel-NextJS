'use client'
import { Room } from '@/models';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from '../form/InputField';
import { FooterBecomeHost } from "./FooterBecomeHost";

interface FloorPlanFormProps {
    onSubmit?: (payload: Partial<Room>) => void,
    data: Array<{ name: string, type: string }>,
    id: number
}

export const FloorPlanForm = ({ onSubmit, data, id }: FloorPlanFormProps) => {
    const [state, setState] = useState<Partial<Room>>({ adult: 1, bedroom: 1, child: 1, bathroom: 1 })

    const { handleSubmit, control, setValue, formState: { isSubmitting } } = useForm<Partial<Room>>({
        defaultValues: {
            adult: 1,
            bedroom: 1,
            child: 1,
            bathroom: 1
        },
    });

    const handleIncrement = (type: keyof Partial<Room>) => {
        setState({ ...state, [type]: Number(state[type]) + 1 });
        setValue(type, Number(state[type]) + 1)
    }

    const handleDecrement = (type: keyof Partial<Room>) => {
        setState({ ...state, [type]: Number(state[type]) <= 1 ? 1 : Number(state[type]) - 1 });
        setValue(type, Number(state[type]) <= 1 ? 1 : Number(state[type]) - 1)
    }

    const handleFormSubmit = async (payload: Partial<Room>) => {
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
                                    <IconButton aria-label="delete" size="small" onClick={() => handleDecrement(item.type as keyof Partial<Room>)}
                                        sx={{ border: '1px solid #B0B0B0' }}>
                                        <RemoveIcon />
                                    </IconButton>

                                    <Typography component={'span'}>{state[item.type as keyof Partial<Room>] as string}</Typography>
                                    <InputField control={control} name={item.type} label='Giá' sx={{ display: 'none' }} />

                                    <IconButton aria-label="delete" size="small" onClick={() => handleIncrement(item.type as keyof Room)}
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
            <Box mt={5}>
                <FooterBecomeHost progressInput={50} disabled={isSubmitting} backTo={`/become-host/${id}/address`}/>
            </Box>
        </Box>
    );
}
